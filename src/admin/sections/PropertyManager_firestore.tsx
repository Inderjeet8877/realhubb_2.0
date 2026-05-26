// src/admin/sections/PropertyManager.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Redesigned with:
//   - Modern card layout with SEO score per property
//   - Content completeness indicator (title, description, images, RERA, map)
//   - SEO health panel in the form showing live score as you fill fields
//   - Status pills, featured badge, image count
//   - Cleaner form layout with section grouping
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus, Search, Pencil, Trash2, X, ChevronLeft,
  Building2, MapPin, CheckCircle, Loader2, AlertCircle,
  Image, FileText, Shield, Star, BarChart2, RefreshCw,
  TrendingUp, ChevronDown, ChevronUp,
} from "lucide-react";
import MultiImageUpload from "../components/MultiImageUpload";
import { AdminProperty, EMPTY_PROPERTY, PropertyCity, PropertyStatus, PropertyType } from "../types/property";
import {
  getProperties, addProperty, updateProperty, deleteProperty,
} from "@/lib/firestoreService";
import { currentProjects, ongoingProjects } from "@/data/properties";

// ─── SEO scorer ───────────────────────────────────────────────────────────────
function calcSeoScore(p: Partial<AdminProperty>): { score: number; checks: { label: string; ok: boolean; tip: string }[] } {
  const checks = [
    {
      label: "Property name",
      ok: !!(p.name && p.name.length >= 10),
      tip: "Name should be at least 10 characters for good title tags",
    },
    {
      label: "Description (50+ chars)",
      ok: !!(p.description && p.description.length >= 50),
      tip: "Write at least 50 characters — used in meta descriptions",
    },
    {
      label: "Images uploaded",
      ok: !!(p.images && p.images.length >= 2),
      tip: "At least 2 images improve engagement and indexability",
    },
    {
      label: "Location & city",
      ok: !!(p.location && p.location.length > 2 && p.city),
      tip: "Location keywords help local SEO rankings",
    },
    {
      label: "RERA number",
      ok: !!(p.rera && p.rera.length > 5),
      tip: "RERA numbers add trust signals and legal content",
    },
    {
      label: "Price listed",
      ok: !!(p.price && p.price.length > 0),
      tip: "Price helps with featured snippet eligibility",
    },
    {
      label: "Map embed URL",
      ok: !!(p.mapEmbedUrl && p.mapEmbedUrl.startsWith("http")),
      tip: "Map embeds improve local search visibility",
    },
    {
      label: "Amenities listed",
      ok: !!(p.amenities && p.amenities.length >= 3),
      tip: "3+ amenities adds long-tail keyword coverage",
    },
  ];
  const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100);
  return { score, checks };
}

function SeoScorePill({ score }: { score: number }) {
  const color = score >= 75 ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : score >= 50 ? "text-amber-700 bg-amber-50 border-amber-200"
    : "text-red-600 bg-red-50 border-red-200";
  const label = score >= 75 ? "Good" : score >= 50 ? "Fair" : "Low";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-normal px-2 py-0.5 rounded-full border ${color}`}>
      <BarChart2 className="h-2.5 w-2.5" />
      SEO {label} · {score}%
    </span>
  );
}

// ─── Completeness dots ────────────────────────────────────────────────────────
function CompleteDots({ property }: { property: AdminProperty }) {
  const items = [
    { ok: !!(property.images?.length >= 1), icon: <Image className="h-3 w-3" />, tip: "Images" },
    { ok: !!(property.description?.length > 30), icon: <FileText className="h-3 w-3" />, tip: "Description" },
    { ok: !!(property.rera?.length > 5), icon: <Shield className="h-3 w-3" />, tip: "RERA" },
    { ok: !!(property.mapEmbedUrl?.startsWith("http")), icon: <MapPin className="h-3 w-3" />, tip: "Map" },
    { ok: !!(property.amenities?.length >= 3), icon: <Star className="h-3 w-3" />, tip: "Amenities" },
  ];
  return (
    <div className="flex items-center gap-1">
      {items.map((item, i) => (
        <span key={i} title={item.tip}
          className={`${item.ok ? "text-emerald-500" : "text-slate-300"}`}>
          {item.icon}
        </span>
      ))}
    </div>
  );
}

// ─── Mapper ───────────────────────────────────────────────────────────────────
function mapToAdmin(p: any, fallbackStatus?: PropertyStatus): AdminProperty {
  return {
    id:          p.id          ?? "",
    slug:        p.slug        ?? p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "",
    name:        p.name        ?? p.title ?? "",
    developer:   p.developer   ?? "",
    city:        (p.city?.toLowerCase() ?? "bangalore") as PropertyCity,
    location:    p.location    ?? "",
    status:      ((p.status === "ongoing" || p.status === "upcoming")
                   ? p.status
                   : (p.projectType === "upcoming" ? "upcoming" : (fallbackStatus ?? "ongoing"))
                 ) as PropertyStatus,
    type:        (p.type?.toLowerCase() ?? "apartment") as PropertyType,
    price:       p.price       ?? "",
    priceValue:  p.priceValue  ?? 0,
    area:        p.area        ?? "",
    bedrooms:    p.bedrooms    ?? p.bhk ?? p.config ?? "",
    images:      Array.isArray(p.images) ? p.images : p.image ? [p.image] : p.coverImage ? [p.coverImage] : [],
    rera:        p.rera        ?? p.reraNumber ?? "",
    possession:  p.possession  ?? p.completionDate ?? "",
    description: p.description ?? "",
    featured:    p.featured    ?? false,
    amenities:   Array.isArray(p.amenities) ? p.amenities : [],
    mapEmbedUrl: p.mapEmbedUrl ?? "",
  };
}

const HARDCODED_FALLBACK: AdminProperty[] = [
  ...currentProjects.map((p: any) => mapToAdmin(p, "upcoming")),
  ...ongoingProjects.map((p: any)  => mapToAdmin(p, "ongoing")),
];

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type View = "list" | "add" | "edit";

// ─── Manager ─────────────────────────────────────────────────────────────────
export default function PropertyManager() {
  const [properties,    setProperties]    = useState<AdminProperty[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [firestoreOk,   setFirestoreOk]   = useState(false);
  const [view,          setView]          = useState<View>("list");
  const [editing,       setEditing]       = useState<AdminProperty | null>(null);
  const [search,        setSearch]        = useState("");
  const [filterCity,    setFilterCity]    = useState<PropertyCity | "all">("all");
  const [filterStatus,  setFilterStatus]  = useState<PropertyStatus | "all">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving,        setSaving]        = useState(false);
  const [saveSuccess,   setSaveSuccess]   = useState(false);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      if (data.length > 0) {
        setProperties(data.map(p => mapToAdmin(p)));
        setFirestoreOk(true);
      } else {
        setProperties(HARDCODED_FALLBACK);
        setFirestoreOk(false);
      }
    } catch (e) {
      setProperties(HARDCODED_FALLBACK);
      setFirestoreOk(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProperties(); }, []);

  const filtered = useMemo(() => properties.filter(p => {
    const q = search.toLowerCase();
    return (
      (!search || p.name.toLowerCase().includes(q) || p.developer.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)) &&
      (filterCity   === "all" || p.city   === filterCity) &&
      (filterStatus === "all" || p.status === filterStatus)
    );
  }), [properties, search, filterCity, filterStatus]);

  // Stats bar
  const stats = useMemo(() => ({
    total:    properties.length,
    ongoing:  properties.filter(p => p.status === "ongoing").length,
    upcoming: properties.filter(p => p.status === "upcoming").length,
    featured: properties.filter(p => p.featured).length,
    goodSeo:  properties.filter(p => calcSeoScore(p).score >= 75).length,
  }), [properties]);

  const handleSave = async (data: Omit<AdminProperty, "id">) => {
    setSaving(true);
    try {
      if (editing) {
        if (firestoreOk) { await updateProperty(editing.id, data); await loadProperties(); }
        else setProperties(prev => prev.map(p => p.id === editing.id ? { ...mapToAdmin(data), id: editing.id } : p));
      } else {
        if (firestoreOk) { await addProperty(data); await loadProperties(); }
        else { const id = `prop-${String(properties.length + 1).padStart(3, "0")}`; setProperties(prev => [...prev, mapToAdmin({ ...data, id })]); }
      }
      setSaveSuccess(true);
      setTimeout(() => { setSaveSuccess(false); setView("list"); setEditing(null); }, 1200);
    } catch (e) { console.error(e); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      if (firestoreOk) await deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
          Loading properties…
        </div>
      </div>
    );
  }

  if (view === "add" || view === "edit") {
    return (
      <PropertyForm
        initial={editing ?? undefined}
        onSave={handleSave}
        onCancel={() => { setView("list"); setEditing(null); }}
        saving={saving || saveSuccess}
        saved={saveSuccess}
      />
    );
  }

  return (
    <div className="space-y-5 max-w-5xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-normal text-slate-800">Properties</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage listings, track SEO scores and content completeness
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadProperties}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => { setEditing(null); setView("add"); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-normal text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm shadow-sky-200"
          >
            <Plus className="h-4 w-4" /> Add Property
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total",    value: stats.total,    color: "text-slate-700",   bg: "bg-slate-50",   border: "border-slate-200" },
          { label: "Ongoing",  value: stats.ongoing,  color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
          { label: "Upcoming", value: stats.upcoming, color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200" },
          { label: "Featured", value: stats.featured, color: "text-violet-700",  bg: "bg-violet-50",  border: "border-violet-200" },
          { label: "SEO ≥75%", value: stats.goodSeo,  color: "text-sky-700",     bg: "bg-sky-50",     border: "border-sky-200" },
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
          <input type="text" placeholder="Search name, developer, location…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition" />
        </div>
        {[
          { value: filterCity, onChange: (v: string) => setFilterCity(v as any), opts: [
            ["all","All Cities"],["bangalore","Bangalore"],["hyderabad","Hyderabad"],["chennai","Chennai"],
          ]},
          { value: filterStatus, onChange: (v: string) => setFilterStatus(v as any), opts: [
            ["all","All Status"],["ongoing","Ongoing"],["upcoming","Upcoming"],
          ]},
        ].map((s, i) => (
          <select key={i} value={s.value} onChange={e => s.onChange(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition">
            {s.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
        <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
          {firestoreOk
            ? <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live · Firestore
              </span>
            : <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full font-medium">
                <AlertCircle className="h-3 w-3" /> Local only
              </span>
          }
        </div>
      </div>

      {/* Showing count */}
      <p className="text-xs text-slate-400 px-1">
        Showing {filtered.length} of {properties.length} properties
      </p>

      {/* Property cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No properties found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting filters or add a new property</p>
          </div>
        )}
        {filtered.map(property => {
          const { score } = calcSeoScore(property);
          return (
            <div key={property.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:border-slate-300 transition-all group">
              <div className="flex items-start gap-4">

                {/* Cover image */}
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                  {property.images?.[0]
                    ? <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    : <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-slate-300" />
                      </div>
                  }
                  {property.images?.length > 1 && (
                    <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                      +{property.images.length - 1}
                    </span>
                  )}
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <p className="font-normal text-slate-800 text-sm">{property.name}</p>
                    {property.featured && (
                      <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 shrink-0">
                        ★ Featured
                      </span>
                    )}
                    <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full shrink-0 ${
                      property.status === "ongoing"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}>
                      {property.status === "ongoing" ? "● Ongoing" : "◌ Upcoming"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5">{property.developer}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {property.location}{property.city ? `, ${property.city.charAt(0).toUpperCase() + property.city.slice(1)}` : ""}
                    </span>
                    {property.price && <span className="text-xs font-normal text-slate-700">{property.price}</span>}
                    {property.bedrooms && <span className="text-xs text-slate-500">{property.bedrooms}</span>}
                    {property.area && <span className="text-xs text-slate-500">{property.area}</span>}
                  </div>

                  {/* SEO + completeness row */}
                  <div className="flex items-center gap-3 mt-2.5">
                    <SeoScorePill score={score} />
                    <CompleteDots property={property} />
                    {property.rera && (
                      <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]" title={property.rera}>
                        RERA: {property.rera}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => { setEditing(property); setView("edit"); }}
                    className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 transition" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(property.id)}
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
                <p className="font-normal text-slate-800">Delete Property?</p>
                <p className="text-sm text-slate-500 mt-1">
                  "{properties.find(p => p.id === deleteConfirm)?.name}" will be permanently removed from Firestore.
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

// ─── Property Form ────────────────────────────────────────────────────────────
interface FormProps {
  initial?: AdminProperty;
  onSave:   (data: Omit<AdminProperty, "id">) => void;
  onCancel: () => void;
  saving:   boolean;
  saved:    boolean;
}

function PropertyForm({ initial, onSave, onCancel, saving, saved }: FormProps) {
  const [form,          setForm]          = useState<Omit<AdminProperty, "id">>(initial ? { ...initial } : { ...EMPTY_PROPERTY });
  const [amenityInput,  setAmenityInput]  = useState("");
  const [seoExpanded,   setSeoExpanded]   = useState(true);

  const set = (f: keyof typeof form, v: unknown) => setForm(p => ({ ...p, [f]: v }));

  const { score, checks } = calcSeoScore(form);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, slug: form.slug || toSlug(form.name) });
  };

  const addAmenity = () => {
    const v = amenityInput.trim();
    if (v && !form.amenities.includes(v)) set("amenities", [...form.amenities, v]);
    setAmenityInput("");
  };

  const scoreColor = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  const scoreBg    = score >= 75 ? "bg-emerald-50 border-emerald-200" : score >= 50 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  return (
    <div className="max-w-4xl space-y-5">
      {/* Back */}
      <button onClick={onCancel}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition">
        <ChevronLeft className="h-4 w-4" />
        Back to Properties
      </button>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-normal text-slate-800">{initial ? "Edit Property" : "Add New Property"}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{initial ? `Editing: ${initial.name}` : "Fill in the details to create a new listing"}</p>
        </div>
        {/* Live SEO score mini ring */}
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${scoreBg}`}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#e2e8f0" strokeWidth="4" />
            <circle cx="20" cy="20" r="15" fill="none" stroke={scoreColor} strokeWidth="4"
              strokeDasharray={`${(score / 100) * 94.2} 94.2`} strokeLinecap="round"
              transform="rotate(-90 20 20)" style={{ transition: "stroke-dasharray 0.5s ease" }} />
            <text x="20" y="20" textAnchor="middle" fontSize="10" fontWeight="800"
              fill={scoreColor} dominantBaseline="central">{score}</text>
          </svg>
          <div>
            <p className="text-xs font-normal" style={{ color: scoreColor }}>SEO Score</p>
            <p className="text-[11px] text-slate-500">
              {checks.filter(c => c.ok).length}/{checks.length} checks passed
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Two-column layout: form left, SEO panel right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

          {/* ── Left: all form fields ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Images */}
            <Section title="Property Images" icon={<Image className="h-4 w-4 text-sky-500" />}
              badge={form.images?.length > 0 ? `${form.images.length} uploaded` : undefined}>
              <MultiImageUpload
                folder="properties"
                images={form.images ?? []}
                onImagesChange={urls => set("images", urls)}
              />
              <p className="text-xs text-slate-400 mt-2">
                Upload 3–8 high-quality images. First image is the cover shown on listing cards.
              </p>
            </Section>

            {/* Basic info */}
            <Section title="Basic Information" icon={<Building2 className="h-4 w-4 text-sky-500" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Property Name *">
                  <input required value={form.name}
                    onChange={e => { set("name", e.target.value); if (!initial) set("slug", toSlug(e.target.value)); }}
                    placeholder="e.g. Prestige Lavender Fields" className={iCls} />
                  {form.name.length > 0 && form.name.length < 10 && (
                    <p className="text-xs text-amber-500 mt-1">Use at least 10 characters for better SEO</p>
                  )}
                </Field>
                <Field label="Developer *">
                  <input required value={form.developer} onChange={e => set("developer", e.target.value)}
                    placeholder="e.g. Prestige Group" className={iCls} />
                </Field>
                <Field label="Location *">
                  <input required value={form.location} onChange={e => set("location", e.target.value)}
                    placeholder="e.g. Whitefield, Bangalore" className={iCls} />
                </Field>
                <Field label="URL Slug">
                  <input value={form.slug} onChange={e => set("slug", e.target.value)}
                    placeholder="auto-generated" className={iCls} />
                </Field>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <Field label="City *">
                  <select value={form.city} onChange={e => set("city", e.target.value)} className={sCls}>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </Field>
                <Field label="Status *">
                  <select value={form.status} onChange={e => set("status", e.target.value)} className={sCls}>
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </Field>
                <Field label="Type">
                  <select value={form.type} onChange={e => set("type", e.target.value)} className={sCls}>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </Field>
                <Field label="Featured">
                  <div className="flex items-center gap-2 h-10">
                    <input type="checkbox" id="featured" checked={!!form.featured}
                      onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-sky-500" />
                    <label htmlFor="featured" className="text-sm text-slate-600 cursor-pointer">Featured</label>
                  </div>
                </Field>
              </div>
            </Section>

            {/* Pricing */}
            <Section title="Pricing & Details" icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Price Range *">
                  <input required value={form.price} onChange={e => set("price", e.target.value)}
                    placeholder="₹85L - ₹2.5Cr" className={iCls} />
                </Field>
                <Field label="Area">
                  <input value={form.area} onChange={e => set("area", e.target.value)}
                    placeholder="1200 - 2800 sq.ft" className={iCls} />
                </Field>
                <Field label="Config / BHK">
                  <input value={form.bedrooms} onChange={e => set("bedrooms", e.target.value)}
                    placeholder="2, 3, 4 BHK" className={iCls} />
                </Field>
                <Field label="Possession">
                  <input value={form.possession} onChange={e => set("possession", e.target.value)}
                    placeholder="Dec 2026" className={iCls} />
                </Field>
                <Field label="RERA Number" className="sm:col-span-2">
                  <input value={form.rera} onChange={e => set("rera", e.target.value)}
                    placeholder="PRM/KA/RERA/…" className={iCls} />
                  {form.rera && (
                    <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> RERA adds trust & SEO value
                    </p>
                  )}
                </Field>
              </div>
            </Section>

            {/* Description — key SEO field */}
            <Section title="Description" icon={<FileText className="h-4 w-4 text-violet-500" />}
              badge={form.description?.length > 0 ? `${form.description.length} chars` : undefined}>
              <textarea value={form.description} onChange={e => set("description", e.target.value)}
                rows={5} placeholder="Write a detailed property description. Include location highlights, nearby landmarks, developer reputation, and key amenities. 150+ words recommended for SEO."
                className={`${iCls} resize-none leading-relaxed`} />
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-xs text-slate-400">
                  {form.description?.length || 0} characters
                  {(form.description?.length || 0) < 50 && <span className="text-amber-500 ml-1">— aim for 50+ for SEO</span>}
                  {(form.description?.length || 0) >= 50 && (form.description?.length || 0) < 150 && <span className="text-emerald-600 ml-1">— good, aim for 150+</span>}
                  {(form.description?.length || 0) >= 150 && <span className="text-emerald-600 ml-1">✓ Excellent length</span>}
                </p>
              </div>
            </Section>

            {/* Map */}
            <Section title="Map Embed URL" icon={<MapPin className="h-4 w-4 text-rose-500" />}>
              <input value={form.mapEmbedUrl} onChange={e => set("mapEmbedUrl", e.target.value)}
                placeholder="https://maps.google.com/maps?q=…" className={iCls} />
              <p className="text-xs text-slate-400 mt-1.5">
                Google Maps embed URL. Helps with local SEO and user engagement.
              </p>
            </Section>

            {/* Amenities */}
            <Section title="Amenities" icon={<Star className="h-4 w-4 text-amber-500" />}
              badge={form.amenities.length > 0 ? `${form.amenities.length} added` : undefined}>
              <div className="flex gap-2">
                <input type="text" value={amenityInput} onChange={e => setAmenityInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                  placeholder="e.g. Swimming Pool · Press Enter to add" className={`flex-1 ${iCls}`} />
                <button type="button" onClick={addAmenity}
                  className="px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium hover:bg-amber-100 transition">
                  Add
                </button>
              </div>
              {form.amenities.length < 3 && (
                <p className="text-xs text-amber-500 mt-1.5">Add at least 3 amenities for better SEO keyword coverage</p>
              )}
              {form.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.amenities.map(a => (
                    <span key={a} className="flex items-center gap-1.5 text-xs bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-medium">
                      {a}
                      <button type="button" onClick={() => set("amenities", form.amenities.filter(x => x !== a))}
                        className="hover:text-red-500 transition ml-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Section>

          </div>

          {/* ── Right: SEO checklist ── */}
          <div className="space-y-4 lg:sticky lg:top-24">

            {/* SEO Health panel */}
            <div className={`rounded-2xl border ${scoreBg} overflow-hidden`}>
              <button type="button"
                onClick={() => setSeoExpanded(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" style={{ color: scoreColor }} />
                  <span className="text-sm font-normal" style={{ color: scoreColor }}>SEO Health</span>
                </div>
                {seoExpanded
                  ? <ChevronUp className="h-4 w-4 text-slate-400" />
                  : <ChevronDown className="h-4 w-4 text-slate-400" />
                }
              </button>

              {seoExpanded && (
                <div className="px-4 pb-4 space-y-2.5 border-t border-slate-200/50">
                  {/* Score bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Overall score</span>
                      <span className="font-normal" style={{ color: scoreColor }}>{score}%</span>
                    </div>
                    <div className="h-2 bg-white/70 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${score}%`, backgroundColor: scoreColor }} />
                    </div>
                  </div>

                  {/* Individual checks */}
                  <div className="space-y-1.5 mt-3">
                    {checks.map(c => (
                      <div key={c.label} className="flex items-start gap-2">
                        {c.ok
                          ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          : <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        }
                        <div>
                          <p className={`text-xs font-medium ${c.ok ? "text-slate-600" : "text-slate-500"}`}>
                            {c.label}
                          </p>
                          {!c.ok && <p className="text-[10px] text-slate-400 leading-tight">{c.tip}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SEO tips */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 space-y-3">
              <p className="text-xs font-normal text-indigo-700 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" /> SEO Best Practices
              </p>
              <ul className="space-y-2">
                {[
                  "Include locality name in property title",
                  "Write 150+ word descriptions",
                  "Add Google Maps embed URL",
                  "Upload 4–8 property photos",
                  "Always fill RERA number",
                  "List 5+ amenities for keywords",
                ].map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-[11px] text-indigo-600">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
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
            className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-normal transition shadow-sm shadow-sky-200 min-w-36 flex items-center justify-center gap-2">
            {saved
              ? <><CheckCircle className="h-4 w-4" /> Saved!</>
              : saving
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
              : initial ? "Save Changes" : "Add Property"
            }
          </button>
        </div>

      </form>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, icon, badge, children }: {
  title: string; icon: React.ReactNode; badge?: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm font-normal text-slate-700">{title}</p>
        </div>
        {badge && (
          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-normal text-slate-500 uppercase tracking-wide block">{label}</label>
      {children}
    </div>
  );
}

const iCls = "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 focus:bg-white transition";
const sCls = "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition";