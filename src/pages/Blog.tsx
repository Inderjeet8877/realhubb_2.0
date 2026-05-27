// src/pages/Blog.tsx
// Redesigned to match home page premium navy/gold design system.

import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import SEO from "@/components/seo/SEO";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BookOpen, Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/Useblogposts";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { published, loading } = useBlogPosts();

  const categories = [
    "all",
    ...Array.from(new Set(published.map(p => p.category.toLowerCase().trim()))),
  ];

  const filteredPosts = published
    .filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        post.category.toLowerCase().trim() === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) =>
      (b.publishedAt || b.date || "").localeCompare(a.publishedAt || a.date || "")
    );

  return (
    <>
      <SEO
        title="Real Estate Blog | Property Tips & Market Insights | RealHubb"
        description="Explore expert articles on property buying, RERA guidelines, home loans, and real estate market trends in Bangalore, Hyderabad & Chennai. Stay informed with RealHubb."
        keywords="real estate blog India, property buying guide, RERA explained, home loan tips, Bangalore real estate trends, property investment tips, RealHubb blog"
        canonical="https://www.realhubb.in/blog"
        image="https://www.realhubb.in/og/blog-realhubb.jpg"
        type="website"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "Blog", url: "https://www.realhubb.in/blog" },
        ]}
      />

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-20 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
                Insights & Guides
              </p>
              <h1 className="text-4xl md:text-[56px] font-normal text-white leading-tight mb-4 max-w-3xl">
                Real Estate <span className="text-[#D7A764]">Insights</span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-xl">
                Expert tips, market trends, and guides to help you make informed property decisions.
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── SEARCH + FILTER ── */}
        <section className="py-10 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Input
                    placeholder="Search articles…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200 focus-visible:ring-[#D7A764]/30 focus-visible:border-[#D7A764]"
                  />
                </div>
                <div className="w-full md:w-56">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-gray-200 focus:ring-[#D7A764]/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Articles" : category.replace(/\b\w/g, c => c.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── POSTS GRID ── */}
        <section className="pb-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            {/* Loading skeletons */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="h-52 bg-gray-100 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-gray-100 animate-pulse rounded w-3/4" />
                      <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
                      <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Posts */}
            {!loading && filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPosts.map((post, index) => (
                  <FadeInOnScroll key={post.id} delay={index * 60} direction="up">
                    <Link to={`/blog/${post.slug}`} className="group block h-full">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">

                        {/* Image */}
                        <div className="relative bg-[#00274D]">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-auto block transition-opacity duration-500 group-hover:opacity-90"
                              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-10 w-10 text-white/30" />
                            </div>
                          )}
                          {/* Category badge */}
                          <span className="absolute top-3 left-3 px-3 py-1 bg-[#D7A764] text-[#00274D] text-[10px] font-normal uppercase tracking-wider rounded-full">
                            {post.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-[#00274D] font-normal text-base mb-2 line-clamp-2 group-hover:text-[#D7A764] transition-colors duration-200 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {(post.publishedAt || post.date)
                                  ? new Date(post.publishedAt || post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                  : "—"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {post.readTime}
                              </span>
                            </div>
                            <span className="flex items-center gap-1 text-[#D7A764] font-normal text-[10px] tracking-wide uppercase group-hover:gap-2 transition-all">
                              Read
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </FadeInOnScroll>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredPosts.length === 0 && (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <BookOpen className="h-10 w-10 text-[#D7A764]" />
                </div>
                <h3 className="text-2xl font-normal text-[#00274D] mb-2">No Articles Found</h3>
                <p className="text-gray-400 text-sm">Try changing your search or category filter.</p>
              </div>
            )}

          </div>
        </section>

      </div>
    </>
  );
};

export default Blog;