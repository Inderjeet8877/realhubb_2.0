// src/admin/FirestoreSeed.tsx
// Run ONCE at /admin/seed — then delete this file and the route.

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { seedProperties, seedBlogPosts, seedDevelopers, seedTeamMembers } from "@/lib/firestoreService";
import { currentProjects, ongoingProjects } from "@/data/properties";
import { blogPosts } from "@/data/blog";         // ← fixed import
import { developers } from "@/data/developers";
import { teamMembers } from "@/data/team";

type SeedStatus = "idle" | "running" | "done" | "error";

interface SeedItem {
  label:  string;
  status: SeedStatus;
  count:  number;
  error?: string;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

// In FirestoreSeed.tsx — update mapProperty to include projectType field
// This is the KEY fix — store which array the property came from

function mapProperty(p: any, status: "ongoing" | "upcoming") {
  return {
    slug:        p.slug        ?? "",
    name:        p.name        ?? p.title ?? "",
    title:       p.title       ?? p.name  ?? "",
    developer:   p.developer   ?? "",
    city:        (p.city?.toLowerCase() ?? "bangalore"),
    location:    p.location    ?? "",
    status:      p.status      ?? "ongoing",
    projectType: status,          // ← "ongoing" or "upcoming" — THIS is the split key
    type:        (p.type?.toLowerCase() ?? "apartment"),
    price:       p.price       ?? "",
    priceValue:  p.priceValue  ?? 0,
    area:        p.area        ?? "",
    bedrooms:    p.bedrooms    ?? p.bhk ?? p.config ?? "",
    bhk:         p.bhk         ?? p.bedrooms ?? "",
    images:      Array.isArray(p.images) ? p.images
                   : p.image ? [p.image] : [],
    rera:        p.rera        ?? p.reraNumber ?? "",
    possession:  p.possession  ?? "",
    description: p.description ?? "",
    featured:    p.featured    ?? false,
    amenities:   p.amenities   ?? [],
    specifications: p.specifications ?? [],
    mapEmbedUrl: p.mapEmbedUrl ?? "",
    completionDate: p.completionDate ?? "",
  };
}

// Then in runSeed:
// currentProjects → mapProperty(p, "upcoming")
// ongoingProjects → mapProperty(p, "ongoing")

function mapBlog(b: any) {
  return {
    slug: b.slug ?? "", title: b.title ?? "",
    excerpt: b.excerpt ?? b.summary ?? "",
    content: b.content ?? b.body ?? `<p>${b.excerpt ?? ""}</p>`,
    coverImage: b.coverImage ?? b.image ?? "",
    category: b.category ?? "Real Estate News",
    author: b.author ?? "RealHubb Team",
    readTime: b.readTime ?? "5 min read",
    publishedAt: b.publishedAt ?? b.date ?? new Date().toISOString().split("T")[0],
    published: b.published ?? true, tags: b.tags ?? [],
  };
}

function mapDeveloper(d: any, i: number) {
  return {
    name: d.name ?? "", slug: d.slug ?? d.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "",
    logo: typeof d.logo === "string" ? d.logo : "",
    description: d.description ?? "", cities: d.cities ?? [], featured: d.featured ?? false,
  };
}

function mapTeamMember(m: any, i: number) {
  return {
    name: m.name ?? "", role: m.role ?? m.designation ?? m.title ?? "",
    photo: typeof m.photo === "string" ? m.photo : (typeof m.image === "string" ? m.image : ""),
    linkedin: m.linkedin ?? m.linkedIn ?? "",
    bio: m.bio ?? m.description ?? "", order: m.order ?? i,
  };
}

// ─── Seed page ────────────────────────────────────────────────────────────────

export default function FirestoreSeed() {
  const allProperties = [
    ...currentProjects.map((p: any) => mapProperty(p, "upcoming")),
    ...ongoingProjects.map((p: any) => mapProperty(p, "ongoing")),
  ];

  const [items, setItems] = useState<SeedItem[]>([
    { label: "Properties", status: "idle", count: allProperties.length },
    { label: "Blog Posts",  status: "idle", count: blogPosts.length },
    { label: "Developers",  status: "idle", count: developers.length },
    { label: "Team Members",status: "idle", count: teamMembers.length },
  ]);

  const [overall, setOverall] = useState<"idle" | "running" | "done" | "error">("idle");

  const setItemStatus = (i: number, status: SeedStatus, error?: string) =>
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, status, error } : it));

  const runSeed = async () => {
    setOverall("running");

    const tasks = [
  () => seedProperties([
    ...currentProjects.map(p => mapProperty(p, "upcoming")),  // ← "upcoming"
    ...ongoingProjects.map(p => mapProperty(p, "ongoing")),   // ← "ongoing"
  ]),
  // () => seedBlogPosts(...),  // already done
  // () => seedDevelopers(...), // already done
  // () => seedTeamMembers(...),// already done
];

    for (let i = 0; i < tasks.length; i++) {
      try {
        setItemStatus(i, "running");
        await tasks[i]();
        setItemStatus(i, "done");
      } catch (e: any) {
        setItemStatus(i, "error", e.message);
        setOverall("error");
        return;
      }
    }

    setOverall("done");
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <div>
        <h1 className="text-xl font-normal text-foreground">Firestore Seed</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Push all hardcoded data into Firestore. Run <strong>once only</strong>, then delete this page.
        </p>
      </div>

      <Card className="p-5 space-y-4">
        <p className="text-sm font-normal text-foreground">Collections to seed:</p>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {item.status === "idle"    && <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />}
                {item.status === "running" && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                {item.status === "done"    && <CheckCircle className="h-4 w-4 text-green-500" />}
                {item.status === "error"   && <AlertCircle className="h-4 w-4 text-destructive" />}
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{item.count} docs</span>
            </div>
          ))}
        </div>

        {items.some(i => i.error) && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs space-y-1">
            {items.filter(i => i.error).map((i, idx) => (
              <p key={idx}><strong>{i.label}:</strong> {i.error}</p>
            ))}
          </div>
        )}

        {overall === "done" && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
            ✅ All data seeded! Delete <code>FirestoreSeed.tsx</code> and the <code>/admin/seed</code> route now.
          </div>
        )}

        <Button
          onClick={runSeed}
          disabled={overall === "running" || overall === "done"}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          {overall === "running" ? (
            <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Seeding…</span>
          ) : overall === "done" ? (
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Done</span>
          ) : (
            "Seed Firestore Now"
          )}
        </Button>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        ⚠️ Running multiple times creates duplicates. Run once only.
      </p>
    </div>
  );
}