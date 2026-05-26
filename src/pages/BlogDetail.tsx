/**
 * Blog Detail Page — connected to Firestore via useBlogPosts()
 * Redesigned to match home page premium navy/gold design system.
 *
 * Translation: uses LanguageSelector + Claude API
 *   - No page reload, no cookies, no Google Translate widget
 *   - Translates title, excerpt, content on demand
 *   - In-memory cache so switching back to a language is instant
 *   - "Original" always restores Firestore content
 */

import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useRef, useCallback } from "react";
import SEO from "@/components/seo/SEO";
import {
  Calendar, Clock, User, ArrowLeft, Share2, Languages,
} from "lucide-react";
import { toast } from "sonner";
import CommentSection from "../components/commnets/CommentSection";
import { useBlogPosts } from "@/hooks/Useblogposts";
import { LanguageSelector, LANGUAGES } from "../components/LanguageSelector";

type TranslationCache = Record<string, { title: string; excerpt: string; content: string }>;

async function translateWithClaude(
  title: string,
  excerpt: string,
  content: string,
  targetLang: string,
  targetLangLabel: string,
): Promise<{ title: string; excerpt: string; content: string }> {
  const systemPrompt = `You are a professional translator. Translate the following blog post fields into ${targetLangLabel} (language code: ${targetLang}).

Rules:
- Return ONLY valid JSON with keys: title, excerpt, content
- Preserve all HTML tags in the content field exactly as-is — only translate the visible text between tags
- Keep proper nouns, brand names (RealHubb, RERA, BDA), and URLs unchanged
- Match the tone and style of the original
- Do not add any explanation, preamble, or markdown code fences`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: JSON.stringify({ title, excerpt, content }) }],
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  const raw   = data.content?.find((b: any) => b.type === "text")?.text ?? "";
  const clean = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  return JSON.parse(clean);
}

function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#faf6f1]">
      <div className="px-8 md:px-14 lg:px-20 xl:px-28 max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-6 w-28 bg-gray-200 rounded" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

function renderContent(raw: string): string {
  if (!raw) return "";
  if (/<[a-z][^>]*>/i.test(raw)) return raw;
  return raw
    .split("\n\n")
    .map(para => {
      const p = para.trim();
      if (!p) return "";
      if (p.startsWith("# "))   return "<h1>" + p.slice(2)  + "</h1>";
      if (p.startsWith("## "))  return "<h2>" + p.slice(3)  + "</h2>";
      if (p.startsWith("### ")) return "<h3>" + p.slice(4)  + "</h3>";
      return "<p>" + p + "</p>";
    })
    .join("\n");
}

const BlogDetail = () => {
  const { slug } = useParams();
  const { posts, published, loading } = useBlogPosts();
  const [isImageOpen, setIsImageOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState("original");
  const [translating,  setTranslating]  = useState(false);
  const cacheRef = useRef<TranslationCache>({});

  const post = useMemo(() => {
    if (!slug) return undefined;
    return published.find(p => p.slug === slug) ?? posts.find(p => p.slug === slug);
  }, [slug, published, posts]);

  const displayContent = useMemo(() => {
    if (!post) return null;
    if (selectedLang === "original")
      return { title: post.title, excerpt: post.excerpt, content: post.content };
    return cacheRef.current[selectedLang]
      ?? { title: post.title, excerpt: post.excerpt, content: post.content };
  }, [post, selectedLang]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const norm = post.category.toLowerCase().trim();
    const same = published.filter(
      p => p.slug !== post.slug && p.category.toLowerCase().trim() === norm
    );
    return same.length >= 2 ? same.slice(0, 2) : published.filter(p => p.slug !== post.slug).slice(0, 2);
  }, [post, published]);

  const handleLangChange = useCallback(async (code: string, label: string) => {
    if (!post) return;
    if (code === "original") { setSelectedLang("original"); return; }
    if (cacheRef.current[code]) { setSelectedLang(code); return; }

    setTranslating(true);
    try {
      const result = await translateWithClaude(post.title, post.excerpt, post.content || "", code, label);
      cacheRef.current[code] = result;
      setSelectedLang(code);
    } catch (err) {
      console.error("Translation error:", err);
      toast.error("Translation failed. Please try again.");
    } finally {
      setTranslating(false);
    }
  }, [post]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, text: post?.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) return <BlogDetailSkeleton />;

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#faf6f1] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md">
          <h2 className="text-2xl font-normal text-[#00274D] mb-4">Article Not Found</h2>
          <p className="text-gray-400 mb-6 text-sm">
            The article you're looking for doesn't exist or may have been removed.
          </p>
          <Link to="/blog">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const coverSrc = (post as any).coverImage || (post as any).image || "";
  const dateStr  = (post as any).publishedAt || (post as any).date || "";

  const shownTitle   = displayContent?.title   ?? post.title;
  const shownExcerpt = displayContent?.excerpt ?? post.excerpt;
  const shownContent = displayContent?.content ?? post.content;

  return (
    <>
      <SEO
        type="article"
        title={`${post.title} | RealHubb Blog`}
        description={post.excerpt.length > 155 ? `${post.excerpt.substring(0, 152)}...` : post.excerpt}
        keywords={`${post.slug ?? post.category}, real estate India, property tips, RealHubb blog`}
        canonical={`https://www.realhubb.in/blog/${post.slug}`}
        image={coverSrc}
        author={post.author}
        datePublished={dateStr}
        dateModified={dateStr}
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "Blog", url: "https://www.realhubb.in/blog" },
          { name: post.title, url: `https://www.realhubb.in/blog/${post.slug}` },
        ]}
      />

      <style>{`
        .blog-content a { color: #D7A764; text-decoration: underline; text-underline-offset: 3px; word-break: break-word; transition: color 0.15s; }
        .blog-content a:hover { color: #c4954a; }
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 { font-weight: 700; margin-top: 1.5em; margin-bottom: 0.5em; color: #00274D; }
        .blog-content h1 { font-size: 1.75rem; }
        .blog-content h2 { font-size: 1.375rem; }
        .blog-content h3 { font-size: 1.125rem; }
        .blog-content p  { margin-bottom: 1em; color: #6b7280; }
        .blog-content ul { list-style: disc; padding-left: 1.5em; margin-bottom: 1em; color: #6b7280; }
        .blog-content ol { list-style: decimal; padding-left: 1.5em; margin-bottom: 1em; color: #6b7280; }
        .blog-content li { margin-bottom: 0.3em; }
        .blog-content blockquote { border-left: 4px solid #D7A764; padding-left: 1em; margin: 1.5em 0; color: #9ca3af; font-style: italic; }
        .blog-content hr     { border-color: #e5e7eb; margin: 1.5em 0; }
        .blog-content strong { font-weight: 700; color: #00274D; }
        .blog-content em     { font-style: italic; }
        .blog-content code   { background: #f3f4f6; padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.875em; }
        .blog-content img    { max-width: 100%; border-radius: 8px; }
        @keyframes fadeInContent { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .translated-content { animation: fadeInContent 0.3s ease; }
      `}</style>

      <div className="min-h-screen pt-24 pb-16 bg-[#faf6f1]">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">
          <div className="max-w-4xl mx-auto">

            {/* Back + Language row */}
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#D7A764] transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Blog
              </Link>

              <LanguageSelector
                currentLang={selectedLang}
                translating={translating}
                onLanguageChange={handleLangChange}
              />
            </div>

            {/* Translation notice */}
            {selectedLang !== "original" && !translating && (
              <div className="mb-4 flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-4 py-2">
                <Languages className="h-3.5 w-3.5 shrink-0 text-[#D7A764]" />
                <span>
                  Translated to{" "}
                  <strong className="text-[#00274D]">{LANGUAGES.find(l => l.code === selectedLang)?.label}</strong> by AI.{" "}
                  <button onClick={() => setSelectedLang("original")} className="underline hover:text-[#D7A764] transition">
                    View original
                  </button>
                </span>
              </div>
            )}

            {/* Header card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
              <span className="inline-block mb-4 px-3 py-1 text-xs bg-[#D7A764]/10 text-[#D7A764] font-normal rounded-full">
                {post.category}
              </span>

              <h1
                key={selectedLang + "-title"}
                className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#00274D] mb-4 translated-content"
              >
                {translating ? post.title : shownTitle}
              </h1>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2"><User className="h-4 w-4" />{post.author}</div>
                {dateStr && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                )}
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</div>
              </div>

              {coverSrc && (
                <div
                  className="w-full bg-gray-900 rounded-xl overflow-hidden mb-6 cursor-zoom-in"
                  onClick={() => setIsImageOpen(true)}
                >
                  <img src={coverSrc} alt={post.title} className="w-full h-auto block"
                    style={{ maxHeight: "70vh", objectFit: "contain", margin: "0 auto" }} />
                </div>
              )}

              <p
                key={selectedLang + "-excerpt"}
                className="text-base sm:text-lg italic border-l-4 border-[#D7A764] pl-4 text-gray-400 translated-content"
              >
                {translating ? post.excerpt : shownExcerpt}
              </p>
            </div>

            {/* Content card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
              {translating ? (
                <div className="space-y-3 animate-pulse">
                  {[100, 90, 95, 85, 100, 80, 92].map((w, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                  ))}
                  <div className="h-4 bg-gray-100 rounded w-1/2 mt-6" />
                  {[100, 88, 94].map((w, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <div
                  key={selectedLang + "-content"}
                  className="blog-content prose prose-base sm:prose-lg max-w-none translated-content"
                  dangerouslySetInnerHTML={{ __html: renderContent(shownContent || "") }}
                  style={{ lineHeight: "1.8", fontSize: "0.95rem" }}
                />
              )}
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs bg-white border border-gray-100 text-gray-400 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <p className="font-normal text-[#00274D]">Enjoyed this article?</p>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D7A764] text-[#D7A764] hover:bg-[#D7A764] hover:text-[#00274D] font-normal text-sm transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share Article
              </button>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-normal text-[#00274D] mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map(r => {
                    const rCover = (r as any).coverImage || (r as any).image || "";
                    return (
                      <Link key={r.id} to={`/blog/${r.slug}`}>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                          <div className="h-44 w-full overflow-hidden bg-gray-100">
                            {rCover && (
                              <img src={rCover} alt={r.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-normal text-[#00274D] line-clamp-2">{r.title}</h3>
                            <p className="text-xs text-gray-400 mt-1">{r.readTime}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-10 sm:mt-12">
              <CommentSection slug={post.slug} />
            </div>

            {/* Mobile floating share */}
            <div className="fixed bottom-4 right-4 sm:hidden z-50">
              <button
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-[#D7A764] text-[#00274D] flex items-center justify-center shadow-lg hover:bg-[#c4954a] transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Fullscreen image */}
            {isImageOpen && coverSrc && (
              <div
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
                onClick={() => setIsImageOpen(false)}
              >
                <img src={coverSrc} alt={post.title}
                  className="max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out" />
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;