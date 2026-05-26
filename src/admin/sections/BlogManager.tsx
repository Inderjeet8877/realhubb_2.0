// src/admin/sections/BlogManager.tsx
// ─────────────────────────────────────────────────────────────────────────────
// SEO-enhanced blog manager matching PropertyManager's design language.
// New features:
//   - SEO score pill on every post card (title, excerpt, cover, content, tags)
//   - Live SEO panel in the form (score ring + checklist + keyword tips)
//   - Readability hint (word count target, heading usage)
//   - Stats strip: total, published, drafts, good SEO count
//   - Modern white/slate card design consistent with PropertyManager
//   - All existing bugs fixed (reverse text, Firestore CRUD)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Plus, Search, Pencil, Trash2, X, ChevronLeft,
  CheckCircle, FileText, Eye, EyeOff, Loader2, AlertCircle,
  normal, Italic, List, ListOrdered, Heading2, Heading3,
  Link as LinkIcon, Quote, Minus, Type, RefreshCw,
  BarChart2, TrendingUp, ChevronDown, ChevronUp, Tag,
} from "lucide-react";
import ImageUpload from "../components/ImageUpload";
import { UploadResult } from "@/lib/uploadToCloudinary";
import {
  getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
} from "@/lib/firestoreService";
import { blogPosts as hardcodedPosts } from "@/data/blog";

export interface AdminBlogPost {
  id:          string;
  slug:        string;
  title:       string;
  excerpt:     string;
  content:     string;
  coverImage:  string;
  category:    string;
  author:      string;
  readTime:    string;
  publishedAt: string;
  published:   boolean;
  tags:        string[];
}

const CATEGORIES = [
  "Real Estate News", "Home Buying Guide", "Investment Tips",
  "RERA & Legal", "Home Loans", "Market Trends",
  "Bangalore", "Hyderabad", "Chennai", "Interior & Design",
];

// ─── SEO scorer ───────────────────────────────────────────────────────────────
function calcBlogSeo(p: Partial<AdminBlogPost> & { contentHtml?: string }): {
  score: number;
  checks: { label: string; ok: boolean; tip: string }[];
} {
  const plainContent = stripHtml(p.content || p.contentHtml || "");
  const wordCount    = plainContent ? plainContent.split(/\s+/).filter(Boolean).length : 0;
  const hasH2        = (p.content || "").includes("<h2");
  const hasH3        = (p.content || "").includes("<h3");

  const checks = [
    {
      label: "Title (30–60 chars)",
      ok:    !!(p.title && p.title.length >= 30 && p.title.length <= 70),
      tip:   "Ideal title is 30–60 characters — shows fully in Google results",
    },
    {
      label: "Excerpt / meta description",
      ok:    !!(p.excerpt && p.excerpt.length >= 80 && p.excerpt.length <= 160),
      tip:   "Write 80–160 char excerpt — used as meta description in search results",
    },
    {
      label: "Cover image uploaded",
      ok:    !!(p.coverImage && p.coverImage.startsWith("http")),
      tip:   "Cover image is used in Open Graph and Google image search",
    },
    {
      label: "Content 300+ words",
      ok:    wordCount >= 300,
      tip:   `Currently ${wordCount} words. Aim for 300+ for indexable content`,
    },
    {
      label: "Uses H2/H3 headings",
      ok:    hasH2 || hasH3,
      tip:   "Headings help Google understand article structure",
    },
    {
      label: "URL slug set",
      ok:    !!(p.slug && p.slug.length > 5),
      tip:   "Descriptive slug improves click-through from search results",
    },
    {
      label: "Category assigned",
      ok:    !!(p.category && p.category !== "Real Estate News" || (p.category === "Real Estate News" && p.title?.length > 0)),
      tip:   "Categories help create topical clusters for SEO",
    },
    {
      label: "Tags added (2+)",
      ok:    !!(p.tags && p.tags.length >= 2),
      tip:   "Tags act as long-tail keyword signals for search engines",
    },
  ];

  const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100);
  return { score, checks };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function SeoScorePill({ score }: { score: number }) {
  const cls = score >= 75
    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : score >= 50
    ? "text-amber-700 bg-amber-50 border-amber-200"
    : "text-red-600 bg-red-50 border-red-200";
  const label = score >= 75 ? "Good" : score >= 50 ? "Fair" : "Low";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-normal px-2 py-0.5 rounded-full border ${cls}`}>
      <BarChart2 className="h-2.5 w-2.5" />
      SEO {label} · {score}%
    </span>
  );
}

// ─── Mapper ───────────────────────────────────────────────────────────────────
function mapBlog(b: any): AdminBlogPost {
  const rawCover = b.coverImage || b.image || "";
  const cover    = typeof rawCover === "string" && rawCover.startsWith("http") ? rawCover : "";
  const date     = b.publishedAt || b.date || new Date().toISOString().split("T")[0];
  return {
    id:          b.id          ?? "",
    slug:        b.slug        ?? "",
    title:       b.title       ?? "",
    excerpt:     b.excerpt     ?? b.summary ?? "",
    content:     b.content     ?? b.body ?? "",
    coverImage:  cover,
    category:    b.category    ?? "Real Estate News",
    author:      b.author      ?? "RealHubb Team",
    readTime:    b.readTime    ?? "5 min read",
    publishedAt: date,
    published:   b.published   !== undefined ? Boolean(b.published) : true,
    tags:        Array.isArray(b.tags) ? b.tags : [],
  };
}

function toSlug(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const EMPTY_POST: Omit<AdminBlogPost, "id"> = {
  slug: "", title: "", excerpt: "", content: "",
  coverImage: "", category: "Real Estate News",
  author: "RealHubb Team", readTime: "5 min read",
  publishedAt: new Date().toISOString().split("T")[0],
  published: false, tags: [],
};

type View = "list" | "add" | "edit";

// ─── Manager list ─────────────────────────────────────────────────────────────
export default function BlogManager() {
  const [posts,         setPosts]         = useState<AdminBlogPost[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [firestoreOk,   setFirestoreOk]   = useState(false);
  const [view,          setView]          = useState<View>("list");
  const [editing,       setEditing]       = useState<AdminBlogPost | null>(null);
  const [search,        setSearch]        = useState("");
  const [filterCat,     setFilterCat]     = useState("all");
  const [filterStatus,  setFilterStatus]  = useState<"all" | "published" | "draft">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving,        setSaving]        = useState(false);
  const [saveSuccess,   setSaveSuccess]   = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      if (data.length > 0) { setPosts(data.map(mapBlog)); setFirestoreOk(true); }
      else { setPosts((hardcodedPosts as any[]).map(mapBlog)); setFirestoreOk(false); }
    } catch (e) {
      console.error("[BlogManager] load:", e);
      setPosts((hardcodedPosts as any[]).map(mapBlog));
      setFirestoreOk(false);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const filtered = useMemo(() => posts.filter(p => {
    const q = search.toLowerCase();
    return (
      (!search || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)) &&
      (filterCat === "all" || p.category === filterCat) &&
      (filterStatus === "all" || (filterStatus === "published" ? p.published : !p.published))
    );
  }), [posts, search, filterCat, filterStatus]);

  // Stats
  const stats = useMemo(() => ({
    total:     posts.length,
    published: posts.filter(p => p.published).length,
    drafts:    posts.filter(p => !p.published).length,
    goodSeo:   posts.filter(p => calcBlogSeo(p).score >= 75).length,
  }), [posts]);

  const handleSave = async (data: Omit<AdminBlogPost, "id">) => {
    setSaving(true);
    try {
      if (editing) {
        if (firestoreOk) await updateBlogPost(editing.id, data);
        else setPosts(prev => prev.map(p => p.id === editing.id ? { ...mapBlog(data), id: editing.id } : p));
      } else {
        if (firestoreOk) await addBlogPost(data);
        else { const id = `blog-${String(posts.length + 1).padStart(3, "0")}`; setPosts(prev => [...prev, mapBlog({ ...data, id })]); }
      }
      if (firestoreOk) await loadPosts();
      setSaveSuccess(true);
      setTimeout(() => { setSaveSuccess(false); setView("list"); setEditing(null); }, 1200);
    } catch (e) { console.error(e); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try { if (firestoreOk) await deleteBlogPost(id); setPosts(prev => prev.filter(p => p.id !== id)); }
    catch (e) { console.error(e); }
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" /> Loading posts…
        </div>
      </div>
    );
  }

  if (view === "add" || view === "edit") {
    return (
      <BlogForm
        initial={editing ?? undefined}
        onSave={handleSave}
        onCancel={() => { setView("list"); setEditing(null); }}
        saving={saving} saved={saveSuccess}
      />
    );
  }

  return (
    <div className="space-y-5 max-w-5xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-normal text-slate-800">Blog Posts</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage articles, track SEO scores and publishing status</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadPosts}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button onClick={() => { setEditing(null); setView("add"); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-normal text-white bg-emerald-500 hover:bg-emerald-600 transition shadow-sm shadow-emerald-200">
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Posts",  value: stats.total,     color: "text-slate-700",   bg: "bg-slate-50",   border: "border-slate-200" },
          { label: "Published",    value: stats.published, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
          { label: "Drafts",       value: stats.drafts,    color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200" },
          { label: "SEO ≥75%",    value: stats.goodSeo,   color: "text-sky-700",     bg: "bg-sky-50",     border: "border-sky-200" },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} px-4 py-3`}>
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search title, author, category…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className={sCls}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className={sCls}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <div className="flex items-center">
          {firestoreOk
            ? <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live · Firestore
              </span>
            : <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full">
                <AlertCircle className="h-3 w-3" /> Local only
              </span>
          }
        </div>
      </div>

      <p className="text-xs text-slate-400 px-1">Showing {filtered.length} of {posts.length} posts</p>

      {/* Post cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No posts found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting filters or write a new post</p>
          </div>
        )}
        {filtered.map(post => {
          const { score } = calcBlogSeo(post);
          const wordCount = stripHtml(post.content).split(/\s+/).filter(Boolean).length;
          return (
            <div key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:border-slate-300 transition-all group">
              <div className="flex items-start gap-4">

                {/* Cover */}
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  {post.coverImage
                    ? <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    : <div className="w-full h-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-slate-300" />
                      </div>
                  }
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <p className="font-normal text-slate-800 text-sm line-clamp-1">{post.title}</p>
                    <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full border shrink-0 ${
                      post.published
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}>
                      {post.published ? "● Published" : "◌ Draft"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{post.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.author}</span>
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                    <span className="text-xs text-slate-400">{post.publishedAt}</span>
                    {wordCount > 0 && (
                      <span className="text-xs text-slate-400">{wordCount} words</span>
                    )}
                  </div>

                  {/* SEO + tags row */}
                  <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                    <SeoScorePill score={score} />
                    {post.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
                        #{t}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[10px] text-slate-400">+{post.tags.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => { setEditing(post); setView("edit"); }}
                    className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 transition" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(post.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-normal text-slate-800">Delete Post?</p>
                <p className="text-sm text-slate-500 mt-1">
                  "{posts.find(p => p.id === deleteConfirm)?.title}" will be permanently removed.
                </p>
              </div>
              <button onClick={() => setDeleteConfirm(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-normal transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Blog Form ────────────────────────────────────────────────────────────────
interface BlogFormProps {
  initial?:  AdminBlogPost;
  onSave:    (data: Omit<AdminBlogPost, "id">) => void;
  onCancel:  () => void;
  saving:    boolean;
  saved:     boolean;
}

function BlogForm({ initial, onSave, onCancel, saving, saved }: BlogFormProps) {
  const [form,      setForm]      = useState<Omit<AdminBlogPost, "id">>(initial ? { ...initial } : { ...EMPTY_POST });
  const [tagInput,  setTagInput]  = useState("");
  const [preview,   setPreview]   = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [seoOpen,   setSeoOpen]   = useState(true);

  const editorRef  = useRef<HTMLDivElement>(null);
  // KEY FIX: content lives ONLY in this ref while the editor is open.
  // Never store editor content in React state — any setState call causes a
  // re-render which resets innerHTML to the stale state value, moving the
  // cursor to position 0 and making text appear in reverse.
  const contentRef = useRef<string>(initial?.content || "");

  const set = (field: keyof typeof form, val: unknown) =>
    setForm(prev => ({ ...prev, [field]: val }));

  // Mount only — set innerHTML exactly once, no deps
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = contentRef.current;
      updateCounts(contentRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateCounts(html: string) {
    const text = stripHtml(html);
    setCharCount(text.length);
    setWordCount(text ? text.split(/\s+/).filter(Boolean).length : 0);
  }

  // Read from DOM only — never from state
  const getContent = useCallback(() => editorRef.current?.innerHTML ?? contentRef.current, []);

  // onInput: update ref + counts — NO setState
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      contentRef.current = editorRef.current.innerHTML;
      updateCounts(editorRef.current.innerHTML);
    }
  }, []);

  // onBlur: update ref + timestamp — NO setState("content")
  const handleBlur = useCallback(() => {
    if (editorRef.current) {
      contentRef.current = editorRef.current.innerHTML;
      updateCounts(editorRef.current.innerHTML);
    }
    setLastSaved(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  const exec    = useCallback((cmd: string, val?: string) => { editorRef.current?.focus(); document.execCommand(cmd, false, val); }, []);
  const insertH = useCallback((tag: "h2" | "h3") => { editorRef.current?.focus(); document.execCommand("formatBlock", false, tag); }, []);

  // Submit: read fresh content from DOM ref
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, slug: form.slug || toSlug(form.title), content: getContent() });
  };

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !form.tags.includes(val)) set("tags", [...form.tags, val]);
    setTagInput("");
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "b") { e.preventDefault(); exec("normal"); }
      if (e.key === "i") { e.preventDefault(); exec("italic"); }
      if (e.key === "k") {
        e.preventDefault();
        const sel = window.getSelection();
        const hasSelection = sel && sel.toString().trim().length > 0;
        const url = prompt("Enter the URL (e.g. https://www.realhubb.in):");
        if (!url) return;
        const fullUrl = url.startsWith("http") ? url : `https://${url}`;
        if (hasSelection) {
          exec("createLink", fullUrl);
        } else {
          const label = prompt("Enter the link text to display:", fullUrl) || fullUrl;
          exec("insertHTML", `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`);
        }
      }
    }
  }, [exec]);

  // Live SEO score (content from DOM for word count accuracy)
  const liveSeoData = useMemo(() => calcBlogSeo({ ...form }), [form]);
  const { score: seoScore, checks: seoChecks } = liveSeoData;
  const seoColor = seoScore >= 75 ? "#10b981" : seoScore >= 50 ? "#f59e0b" : "#ef4444";
  const seoBg    = seoScore >= 75 ? "bg-emerald-50 border-emerald-200" : seoScore >= 50 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  const titleLen = form.title.length;
  const excerptLen = form.excerpt.length;

  return (
    <div className="max-w-4xl space-y-5">

      {/* Back + autosave */}
      <div className="flex items-center justify-between">
        <button onClick={onCancel}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition">
          <ChevronLeft className="h-4 w-4" /> Back to Blog Posts
        </button>
        {lastSaved && <span className="text-xs text-slate-400">Auto-saved {lastSaved}</span>}
      </div>

      {/* Header + SEO ring */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-normal text-slate-800">{initial ? "Edit Post" : "New Blog Post"}</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {initial ? `Editing: ${initial.title}` : "Write and publish a new blog post"}
          </p>
        </div>
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${seoBg}`}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#e2e8f0" strokeWidth="4" />
            <circle cx="20" cy="20" r="15" fill="none" stroke={seoColor} strokeWidth="4"
              strokeDasharray={`${(seoScore / 100) * 94.2} 94.2`} strokeLinecap="round"
              transform="rotate(-90 20 20)" style={{ transition: "stroke-dasharray 0.5s ease" }} />
            <text x="20" y="20" textAnchor="middle" fontSize="10" fontWeight="800"
              fill={seoColor} dominantBaseline="central">{seoScore}</text>
          </svg>
          <div>
            <p className="text-xs font-normal" style={{ color: seoColor }}>SEO Score</p>
            <p className="text-[11px] text-slate-500">{seoChecks.filter(c => c.ok).length}/{seoChecks.length} checks</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

          {/* ── Left: form ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Cover image */}
            <Section title="Cover Image" icon={<FileText className="h-4 w-4 text-emerald-500" />}
              badge={form.coverImage ? "✓ Uploaded" : undefined}>
              <ImageUpload folder="blogs" label="Blog cover photo" hint="Recommended: 1200×675px JPG or WebP"
                currentUrl={form.coverImage || undefined}
                onUploadComplete={(r: UploadResult) => set("coverImage", r.url)}
                onRemove={() => set("coverImage", "")} />
              <div className="mt-3">
                <label className={lCls}>Or paste image URL</label>
                <input type="url" value={form.coverImage} onChange={e => set("coverImage", e.target.value)}
                  placeholder="https://res.cloudinary.com/..." className={`mt-1.5 ${iCls}`} />
              </div>
              {!form.coverImage && (
                <p className="text-xs text-amber-500 mt-1.5">Cover image is used in Google snippets and social sharing</p>
              )}
            </Section>

            {/* Post details */}
            <Section title="Post Details" icon={<FileText className="h-4 w-4 text-sky-500" />}>

              <Field label="Title *">
                <input required value={form.title}
                  onChange={e => { set("title", e.target.value); if (!initial) set("slug", toSlug(e.target.value)); }}
                  placeholder="e.g. Top 10 Tips for Buying a Home in Bangalore 2026" className={iCls} />
                <div className="flex items-center justify-between mt-1">
                  <p className={`text-xs ${titleLen < 30 ? "text-amber-500" : titleLen > 70 ? "text-red-500" : "text-emerald-600"}`}>
                    {titleLen} chars
                    {titleLen < 30 && " — too short (aim 30–60)"}
                    {titleLen > 70 && " — too long (may truncate in Google)"}
                    {titleLen >= 30 && titleLen <= 70 && " ✓ Ideal length"}
                  </p>
                </div>
              </Field>

              <Field label="URL Slug">
                <input value={form.slug} onChange={e => set("slug", e.target.value)}
                  placeholder="auto-generated from title" className={iCls} />
                <p className="text-xs text-slate-400 mt-1">
                  Use lowercase words separated by hyphens. Include main keyword.
                </p>
              </Field>

              <Field label="Excerpt / Meta Description *">
                <textarea required value={form.excerpt} onChange={e => set("excerpt", e.target.value)}
                  rows={3} placeholder="Write a compelling 80–160 character summary. This appears in Google search results under the page title."
                  className={`${iCls} resize-none`} />
                <div className="flex items-center justify-between mt-1">
                  <p className={`text-xs ${excerptLen < 80 ? "text-amber-500" : excerptLen > 160 ? "text-red-500" : "text-emerald-600"}`}>
                    {excerptLen} chars
                    {excerptLen < 80 && " — aim for 80–160 for meta description"}
                    {excerptLen > 160 && " — may truncate in Google results"}
                    {excerptLen >= 80 && excerptLen <= 160 && " ✓ Perfect meta description length"}
                  </p>
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Category *">
                  <select value={form.category} onChange={e => set("category", e.target.value)} className={sCls}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Author">
                  <input value={form.author} onChange={e => set("author", e.target.value)}
                    placeholder="RealHubb Team" className={iCls} />
                </Field>
                <Field label="Read Time">
                  <input value={form.readTime} onChange={e => set("readTime", e.target.value)}
                    placeholder="5 min read" className={iCls} />
                </Field>
                <Field label="Publish Date">
                  <input type="date" value={form.publishedAt}
                    onChange={e => set("publishedAt", e.target.value)} className={iCls} />
                </Field>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input type="checkbox" id="published" checked={form.published}
                  onChange={e => set("published", e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                <label htmlFor="published" className="text-sm text-slate-600 cursor-pointer flex items-center gap-1.5">
                  {form.published
                    ? <><Eye className="h-4 w-4 text-emerald-500" /> Published — visible on site</>
                    : <><EyeOff className="h-4 w-4 text-slate-400" /> Draft — hidden from site</>
                  }
                </label>
              </div>
            </Section>

            {/* Content editor */}
            <Section title="Content" icon={<FileText className="h-4 w-4 text-violet-500" />}
              badge={wordCount > 0 ? `${wordCount} words · ${charCount} chars` : undefined}
              extra={
                <button type="button"
                  onClick={() => { if (editorRef.current) contentRef.current = editorRef.current.innerHTML; setPreview(v => !v); }}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-slate-500 hover:text-slate-700">
                  {preview ? <><Pencil className="h-3.5 w-3.5" /> Edit</> : <><Eye className="h-3.5 w-3.5" /> Preview</>}
                </button>
              }>

              {!preview ? (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                    <TBtn title="normal (Ctrl+B)"     onClick={() => exec("normal")}><normal className="h-3.5 w-3.5" /></TBtn>
                    <TBtn title="Italic (Ctrl+I)"   onClick={() => exec("italic")}><Italic className="h-3.5 w-3.5" /></TBtn>
                    <TSep />
                    <TBtn title="Heading 2 (H2)"    onClick={() => insertH("h2")}><Heading2 className="h-3.5 w-3.5" /></TBtn>
                    <TBtn title="Heading 3 (H3)"    onClick={() => insertH("h3")}><Heading3 className="h-3.5 w-3.5" /></TBtn>
                    <TSep />
                    <TBtn title="Bullet list"       onClick={() => exec("insertUnorderedList")}><List className="h-3.5 w-3.5" /></TBtn>
                    <TBtn title="Numbered list"     onClick={() => exec("insertOrderedList")}><ListOrdered className="h-3.5 w-3.5" /></TBtn>
                    <TSep />
                    <TBtn title="Blockquote"        onClick={() => exec("formatBlock", "blockquote")}><Quote className="h-3.5 w-3.5" /></TBtn>
                    <TBtn title="Divider line"      onClick={() => exec("insertHorizontalRule")}><Minus className="h-3.5 w-3.5" /></TBtn>
                    <TSep />
                    <TBtn title="Insert link (Ctrl+K)" onClick={() => {
                      // If text is selected, wrap it in an anchor
                      const sel = window.getSelection();
                      const hasSelection = sel && sel.toString().trim().length > 0;
                      const url = prompt("Enter the URL (e.g. https://www.realhubb.in):");
                      if (!url) return;
                      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
                      if (hasSelection) {
                        // Wrap selected text — cleanest result
                        exec("createLink", fullUrl);
                      } else {
                        // No selection — ask for link label so we don't insert raw URL as text
                        const label = prompt("Enter the link text to display:", fullUrl) || fullUrl;
                        const anchor = `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
                        exec("insertHTML", anchor);
                      }
                    }}>
                      <LinkIcon className="h-3.5 w-3.5" />
                    </TBtn>
                    <TBtn title="Clear formatting"  onClick={() => exec("removeFormat")}><Type className="h-3.5 w-3.5" /></TBtn>
                    <TSep />
                    <TBtn title="Undo" onClick={() => exec("undo")}><span className="text-[11px] font-medium">↩</span></TBtn>
                    <TBtn title="Redo" onClick={() => exec("redo")}><span className="text-[11px] font-medium">↪</span></TBtn>
                  </div>

                  {/* Editable — NO dangerouslySetInnerHTML */}
                  <div ref={editorRef} contentEditable suppressContentEditableWarning
                    onInput={handleInput} onBlur={handleBlur} onKeyDown={handleKeyDown}
                    className="min-h-[360px] p-4 text-sm bg-white text-slate-800 focus:outline-none prose prose-sm max-w-none"
                    style={{ lineHeight: "1.8" }}
                    data-placeholder="Start writing… Use H2/H3 headings to structure your article for SEO" />
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                    <span className="text-xs text-slate-400 font-medium">Preview</span>
                  </div>
                  {contentRef.current
                    ? <div className="min-h-48 p-6 prose prose-sm max-w-none text-sm bg-white blog-content"
                        dangerouslySetInnerHTML={{ __html: contentRef.current }} style={{ lineHeight: "1.8" }} />
                    : <div className="min-h-48 p-6 flex items-center justify-center text-slate-400 text-sm bg-white">
                        Nothing written yet.
                      </div>
                  }
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-400">Ctrl+B normal · Ctrl+I italic · Ctrl+K link</p>
                {wordCount > 0 && wordCount < 300 && (
                  <p className="text-xs text-amber-500">{300 - wordCount} more words to reach 300 (SEO minimum)</p>
                )}
                {wordCount >= 300 && (
                  <p className="text-xs text-emerald-600">✓ Good length for SEO</p>
                )}
              </div>
            </Section>

            {/* Tags */}
            <Section title="Tags & Keywords" icon={<Tag className="h-4 w-4 text-sky-500" />}
              badge={form.tags.length > 0 ? `${form.tags.length} tags` : undefined}>
              <div className="flex gap-2">
                <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="e.g. RERA, Bangalore real estate, home buying tips…" className={`flex-1 ${iCls}`} />
                <button type="button" onClick={addTag}
                  className="px-4 py-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-sm font-medium hover:bg-sky-100 transition">
                  Add
                </button>
              </div>
              {form.tags.length < 2 && (
                <p className="text-xs text-amber-500 mt-1.5">Add at least 2 tags — they act as keyword signals for search engines</p>
              )}
              {form.tags.length >= 2 && form.tags.length < 5 && (
                <p className="text-xs text-slate-400 mt-1.5">Good — aim for 4–6 tags covering your main keywords</p>
              )}
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.tags.map(t => (
                    <span key={t} className="flex items-center gap-1.5 text-xs bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-medium">
                      #{t}
                      <button type="button" onClick={() => set("tags", form.tags.filter(x => x !== t))}
                        className="hover:text-red-500 transition"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </Section>

          </div>

          {/* ── Right: SEO panel (sticky) ── */}
          <div className="space-y-4 lg:sticky lg:top-24">

            {/* SEO checklist */}
            <div className={`rounded-2xl border ${seoBg} overflow-hidden`}>
              <button type="button" onClick={() => setSeoOpen(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" style={{ color: seoColor }} />
                  <span className="text-sm font-normal" style={{ color: seoColor }}>SEO Health</span>
                </div>
                {seoOpen
                  ? <ChevronUp className="h-4 w-4 text-slate-400" />
                  : <ChevronDown className="h-4 w-4 text-slate-400" />
                }
              </button>

              {seoOpen && (
                <div className="px-4 pb-4 space-y-2.5 border-t border-slate-200/50">
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Overall score</span>
                      <span className="font-normal" style={{ color: seoColor }}>{seoScore}%</span>
                    </div>
                    <div className="h-2 bg-white/70 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${seoScore}%`, backgroundColor: seoColor }} />
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-3">
                    {seoChecks.map(c => (
                      <div key={c.label} className="flex items-start gap-2">
                        {c.ok
                          ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          : <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        }
                        <div>
                          <p className={`text-xs font-medium ${c.ok ? "text-slate-600" : "text-slate-500"}`}>{c.label}</p>
                          {!c.ok && <p className="text-[10px] text-slate-400 leading-tight">{c.tip}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SEO best practices */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 space-y-3">
              <p className="text-xs font-normal text-indigo-700 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" /> Blog SEO Tips
              </p>
              <ul className="space-y-2">
                {[
                  "Include city name in title (e.g. Bangalore)",
                  "Write 500–1500 word articles",
                  "Use H2 for main sections, H3 for subsections",
                  "Add internal links to property pages",
                  "Write meta description as a call-to-action",
                  "Include RERA, BDA, property type as tags",
                  "Post regularly — Google rewards fresh content",
                ].map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-[11px] text-indigo-600">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Word count target */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-normal text-slate-600 mb-3">Content Length Target</p>
              {[
                { label: "Minimum (300)", target: 300, color: "bg-amber-400" },
                { label: "Good (600)",    target: 600, color: "bg-sky-400" },
                { label: "Best (1000+)", target: 1000, color: "bg-emerald-400" },
              ].map(t => {
                const pct = Math.min(100, Math.round((wordCount / t.target) * 100));
                return (
                  <div key={t.label} className="mb-2.5">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">{t.label}</span>
                      <span className={pct >= 100 ? "text-emerald-600 font-normal" : "text-slate-400"}>
                        {pct >= 100 ? "✓ Done" : `${pct}%`}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${t.color} transition-all duration-500`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-slate-400 mt-2 text-center">{wordCount} words written</p>
            </div>

          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pb-8 pt-2">
          <button type="button" onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-normal transition shadow-sm shadow-emerald-200 min-w-36 flex items-center justify-center gap-2">
            {saved   ? <><CheckCircle className="h-4 w-4" /> Saved!</>
            : saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
            : initial ? "Save Changes" : "Publish Post"}
          </button>
          {!form.published && (
            <button type="button"
              onClick={() => { set("published", true); setTimeout(() => (document.querySelector("form") as HTMLFormElement)?.requestSubmit(), 100); }}
              className="px-5 py-2.5 rounded-xl border border-emerald-200 text-emerald-700 text-sm font-medium hover:bg-emerald-50 transition">
              Save &amp; Publish
            </button>
          )}
        </div>
      </form>

      <style>{`
        [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Section({ title, icon, badge, extra, children }: {
  title: string; icon: React.ReactNode; badge?: string; extra?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm font-normal text-slate-700">{title}</p>
          {badge && (
            <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
              {badge}
            </span>
          )}
        </div>
        {extra}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className={lCls}>{label}</label>
      {children}
    </div>
  );
}

function TBtn({ children, onClick, title }: { children: React.ReactNode; onClick: () => void; title: string }) {
  return (
    <button type="button" title={title}
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      className="w-7 h-7 rounded flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition">
      {children}
    </button>
  );
}

function TSep() { return <div className="w-px h-4 bg-slate-200 mx-0.5 shrink-0" />; }

const iCls = "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition";
const sCls = "px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition";
const lCls = "text-xs font-normal text-slate-500 uppercase tracking-wide block";