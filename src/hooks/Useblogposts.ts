// src/hooks/Useblogposts.ts
// ─────────────────────────────────────────────────────────────────────────────
// FIX vs previous version:
//   - Sort by publishedAt date (ISO string) instead of parsing numeric ID.
//     Firestore docs have auto-generated string IDs like "abc123def" — the
//     old parseInt(id.split("-")[1]) returned NaN for them, destroying sort.
//   - normalizePost() guards coverImage against local blob URLs (new URL().href)
//     which break when returned from Firestore
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { getBlogPosts } from "@/lib/firestoreService";
import { blogPosts as hardcodedPosts } from "@/data/blog";

export interface BlogPost {
  id:          string;
  slug:        string;
  title:       string;
  excerpt:     string;
  content:     string;
  coverImage:  string;
  image:       string;   // legacy alias
  category:    string;
  author:      string;
  readTime:    string;
  publishedAt: string;
  date:        string;   // legacy alias
  published:   boolean;
  tags:        string[];
}

function normalizePost(p: any): BlogPost {
  const rawCover = p.coverImage || p.image || "";
  // Guard: skip local blob/file URLs (new URL(...).href) — only keep http URLs
  const cover = typeof rawCover === "string" && rawCover.startsWith("http") ? rawCover : "";
  const date  = p.publishedAt || p.date || "";
  return {
    id:          p.id          ?? "",
    slug:        p.slug        ?? "",
    title:       p.title       ?? "",
    excerpt:     p.excerpt     ?? p.summary ?? "",
    content:     p.content     ?? p.body ?? "",
    coverImage:  cover,
    image:       cover,
    category:    p.category    ?? "Real Estate News",
    author:      p.author      ?? "RealHubb Team",
    readTime:    p.readTime    ?? "5 min read",
    publishedAt: date,
    date,
    published:   p.published   !== undefined ? Boolean(p.published) : true,
    tags:        Array.isArray(p.tags) ? p.tags : [],
  };
}

// Sort newest-first using publishedAt date string (works for both sources)
function sortByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) =>
    (b.publishedAt || b.date || "").localeCompare(a.publishedAt || a.date || "")
  );
}

interface UseBlogPostsResult {
  posts:         BlogPost[];
  published:     BlogPost[];
  loading:       boolean;
  fromFirestore: boolean;
  getBySlug:     (slug: string) => BlogPost | undefined;
  getByCategory: (cat:  string) => BlogPost[];
}

export function useBlogPosts(): UseBlogPostsResult {
  const [posts,         setPosts]         = useState<BlogPost[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [fromFirestore, setFromFirestore] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogPosts();
        if (data.length > 0) {
          setPosts(sortByDate(data.map(normalizePost)));
          setFromFirestore(true);
        } else {
          setPosts(sortByDate((hardcodedPosts as any[]).map(normalizePost)));
        }
      } catch {
        setPosts(sortByDate((hardcodedPosts as any[]).map(normalizePost)));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const published = posts.filter(p => p.published);

  return {
    posts,
    published,
    loading,
    fromFirestore,
    getBySlug:     slug => published.find(p => p.slug === slug),
    getByCategory: cat  => published.filter(p => p.category === cat),
  };
}