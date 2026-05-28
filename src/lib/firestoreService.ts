// src/lib/firestoreService.ts

import {
  collection, doc, getDocs, addDoc, setDoc,
  updateDoc, deleteDoc, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { AdminProperty }  from "@/admin/types/property";
import type { AdminBlogPost }  from "@/admin/sections/BlogManager";
import type { AdminDeveloper } from "@/admin/sections/DevelopersManager";
import type { AdminTeamMember } from "@/admin/sections/TeamManager";
import { sendNotification }    from "./sendNotification";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clean<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

async function fetchAll(col: string) {
  const snap = await getDocs(collection(db, col));
  return snap.docs;
}

// ── PROPERTIES ────────────────────────────────────────────────────────────────

export async function getProperties(): Promise<AdminProperty[]> {
  const docs  = await fetchAll("properties");
  const items = docs.map(d => {
    const r = d.data();
    return {
      id:          d.id,
      slug:        r.slug        ?? r.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "",
      name:        r.name        ?? r.title ?? "",
      developer:   r.developer   ?? "",
      city:        (r.city?.toLowerCase() ?? "bangalore"),
      location:    r.location    ?? "",
      status:      (r.status === "ongoing" || r.status === "upcoming" ? r.status : "ongoing"),
      type:        (r.type?.toLowerCase() ?? "apartment"),
      price:       r.price       ?? "",
      priceValue:  r.priceValue  ?? 0,
      area:        r.area        ?? "",
      bedrooms:    r.bedrooms    ?? r.bhk ?? r.config ?? "",
      images:      Array.isArray(r.images)
                     ? r.images
                     : r.image      ? [r.image]
                     : r.coverImage ? [r.coverImage]
                     : [],
      rera:        r.rera        ?? r.reraNumber ?? "",
      possession:  r.possession  ?? r.completionDate ?? "",
      description: r.description ?? "",
      featured:    r.featured    ?? false,
      amenities:   Array.isArray(r.amenities) ? r.amenities : [],
      mapEmbedUrl: r.mapEmbedUrl ?? "",
      projectType: r.projectType ?? r.status ?? "ongoing",
    };
  });
  return items.sort((a, b) => a.name.localeCompare(b.name)) as AdminProperty[];
}

export async function addProperty(data: Omit<AdminProperty, "id">): Promise<AdminProperty> {
  const ref = await addDoc(collection(db, "properties"), {
    ...clean(data as any),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Auto push notification to all subscribers
  try {
    await sendNotification({
      title: `🏠 New Property: ${data.name}`,
      body:  `${data.location} · Starting ${data.price}`,
      url:   `/property/${data.slug}`,
      tag:   "new-property",
    });
  } catch (e) {
    console.warn("[addProperty] push notification failed:", e);
  }

  return { id: ref.id, ...data };
}

export async function updateProperty(id: string, data: Omit<AdminProperty, "id">): Promise<void> {
  await updateDoc(doc(db, "properties", id), {
    ...clean(data as any),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProperty(id: string): Promise<void> {
  await deleteDoc(doc(db, "properties", id));
}

export async function seedProperties(properties: any[]): Promise<void> {
  await Promise.all(
    properties.map(p =>
      setDoc(doc(collection(db, "properties")), {
        ...clean(p),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    )
  );
}

// ── BLOG POSTS ────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<AdminBlogPost[]> {
  const docs  = await fetchAll("blogPosts");
  const items = docs.map(d => {
    const r = d.data();
    return {
      id:          d.id,
      slug:        r.slug        ?? "",
      title:       r.title       ?? "",
      excerpt:     r.excerpt     ?? "",
      content:     r.content     ?? "",
      coverImage:  r.coverImage  ?? r.image ?? "",
      category:    r.category    ?? "Real Estate News",
      author:      r.author      ?? "RealHubb Team",
      readTime:    r.readTime    ?? "5 min read",
      publishedAt: r.publishedAt instanceof Timestamp
        ? r.publishedAt.toDate().toISOString().split("T")[0]
        : (r.publishedAt ?? ""),
      published:   r.published   ?? false,
      tags:        r.tags        ?? [],
    } as AdminBlogPost;
  });
  return items.sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
  );
}

export async function addBlogPost(data: Omit<AdminBlogPost, "id">): Promise<AdminBlogPost> {
  const ref = await addDoc(collection(db, "blogPosts"), {
    ...clean(data as any),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Auto push notification when a post is published
  if (data.published) {
    try {
      await sendNotification({
        title: `📰 New Article: ${data.title}`,
        body:  data.excerpt ? data.excerpt.slice(0, 100) : "Read the latest from RealHubb",
        url:   `/blog/${data.slug}`,
        tag:   "new-blog",
      });
    } catch (e) {
      console.warn("[addBlogPost] push notification failed:", e);
    }
  }

  return { id: ref.id, ...data };
}

export async function updateBlogPost(id: string, data: Omit<AdminBlogPost, "id">): Promise<void> {
  await updateDoc(doc(db, "blogPosts", id), {
    ...clean(data as any),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogPost(id: string): Promise<void> {
  await deleteDoc(doc(db, "blogPosts", id));
}

export async function seedBlogPosts(posts: Omit<AdminBlogPost, "id">[]): Promise<void> {
  await Promise.all(
    posts.map(p =>
      setDoc(doc(collection(db, "blogPosts")), {
        ...clean(p as any),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    )
  );
}

// ── DEVELOPERS ────────────────────────────────────────────────────────────────

export async function getDevelopers(): Promise<AdminDeveloper[]> {
  const docs  = await fetchAll("developers");
  const items = docs.map(d => ({ id: d.id, ...d.data() } as AdminDeveloper));
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export async function addDeveloper(data: Omit<AdminDeveloper, "id">): Promise<AdminDeveloper> {
  const ref = await addDoc(collection(db, "developers"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: ref.id, ...data };
}

export async function updateDeveloper(id: string, data: Omit<AdminDeveloper, "id">): Promise<void> {
  await updateDoc(doc(db, "developers", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDeveloper(id: string): Promise<void> {
  await deleteDoc(doc(db, "developers", id));
}

export async function seedDevelopers(developers: Omit<AdminDeveloper, "id">[]): Promise<void> {
  await Promise.all(
    developers.map(d =>
      setDoc(doc(collection(db, "developers")), {
        ...d,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    )
  );
}

// ── TEAM ──────────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<AdminTeamMember[]> {
  const docs  = await fetchAll("team");
  const items = docs.map(d => ({ id: d.id, ...d.data() } as AdminTeamMember));
  return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function addTeamMember(data: Omit<AdminTeamMember, "id">): Promise<AdminTeamMember> {
  const ref = await addDoc(collection(db, "team"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: ref.id, ...data };
}

export async function updateTeamMember(id: string, data: Omit<AdminTeamMember, "id">): Promise<void> {
  await updateDoc(doc(db, "team", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, "team", id));
}

export async function seedTeamMembers(members: Omit<AdminTeamMember, "id">[]): Promise<void> {
  await Promise.all(
    members.map(m =>
      setDoc(doc(collection(db, "team")), {
        ...m,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    )
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
// Firestore rule needed (add to Firebase Console → Firestore → Rules):
// match /gallery/{id} {
//   allow read: if true;
//   allow write: if request.auth != null;
// }

export interface AdminGalleryPost {
  id:          string;
  title:       string;
  description: string;
  image:       string;
  category:    string;
  published:   boolean;
  publishedAt: string;
}

export async function getGalleryPosts(): Promise<AdminGalleryPost[]> {
  const docs  = await fetchAll("gallery");
  const items = docs.map(d => {
    const r = d.data();
    return {
      id:          d.id,
      title:       r.title       ?? "",
      description: r.description ?? "",
      image:       r.image       ?? "",
      category:    r.category    ?? "General",
      published:   r.published   ?? false,
      publishedAt: r.publishedAt instanceof Timestamp
        ? r.publishedAt.toDate().toISOString().split("T")[0]
        : (r.publishedAt ?? ""),
    } as AdminGalleryPost;
  });
  return items.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export async function addGalleryPost(data: Omit<AdminGalleryPost, "id">): Promise<AdminGalleryPost> {
  const ref = await addDoc(collection(db, "gallery"), {
    ...clean(data as any),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: ref.id, ...data };
}

export async function updateGalleryPost(id: string, data: Omit<AdminGalleryPost, "id">): Promise<void> {
  await updateDoc(doc(db, "gallery", id), {
    ...clean(data as any),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGalleryPost(id: string): Promise<void> {
  await deleteDoc(doc(db, "gallery", id));
}