// src/admin/sections/DevelopersManager.tsx
import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Pencil, Trash2, X, Building2 } from "lucide-react";
import { developers as initialData } from "@/data/developers";
import ImageUpload from "../components/ImageUpload";
import { getDevelopers, addDeveloper, updateDeveloper, deleteDeveloper } from "@/lib/firestoreService";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export interface AdminDeveloper {
  id:          string;
  name:        string;
  slug:        string;
  logo:        string;
  description: string;
  cities:      string[];
  featured:    boolean;
}

function mapDeveloper(d: any, i: number): AdminDeveloper {
  return {
    id:          d.id   ?? `dev-${String(i + 1).padStart(3, "0")}`,
    name:        d.name ?? "",
    slug:        d.slug ?? d.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "",
    logo:        typeof d.logo === "string" ? d.logo : "",
    description: d.description ?? "",
    cities:      d.cities      ?? [],
    featured:    d.featured    ?? false,
  };
}

export default function DevelopersManager() {
  const [developers,    setDevelopers]    = useState<AdminDeveloper[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [firestoreOk,   setFirestoreOk]   = useState(false);
  const [search,        setSearch]        = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showForm,      setShowForm]      = useState(false);
  const [editing,       setEditing]       = useState<AdminDeveloper | null>(null);

  // ── Load from Firestore on mount ──────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const data = await getDevelopers();
        if (data.length > 0) {
          setDevelopers(data);
          setFirestoreOk(true);
        } else {
          setDevelopers(initialData.map(mapDeveloper));
        }
      } catch {
        setDevelopers(initialData.map(mapDeveloper));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() =>
    developers.filter(d =>
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.cities.some(c => c.toLowerCase().includes(search.toLowerCase()))
    ), [developers, search]);

  const handleDelete = async (id: string) => {
    try {
      if (firestoreOk) await deleteDeveloper(id);
      setDevelopers(prev => prev.filter(d => d.id !== id));
    } catch (e) { console.error(e); }
    setDeleteConfirm(null);
  };

  const handleSave = async (data: Omit<AdminDeveloper, "id">) => {
    try {
      if (editing) {
        if (firestoreOk) await updateDeveloper(editing.id, data);
        setDevelopers(prev => prev.map(d => d.id === editing.id ? { ...data, id: editing.id } : d));
      } else {
        if (firestoreOk) {
          const created = await addDeveloper(data);
          setDevelopers(prev => [...prev, created]);
        } else {
          const id = `dev-${String(developers.length + 1).padStart(3, "0")}`;
          setDevelopers(prev => [...prev, { ...data, id }]);
        }
      }
    } catch (e) { console.error(e); }
    setShowForm(false);
    setEditing(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          Loading developers…
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <DeveloperForm
        initial={editing ?? undefined}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditing(null); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">{filtered.length} of {developers.length} developers</p>
          {firestoreOk
            ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Live · Firestore</span>
            : <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Local only</span>
          }
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="h-4 w-4" /> Add Developer
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(dev => (
          <Card key={dev.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 rounded-lg border border-border bg-white flex items-center justify-center shrink-0 p-2">
                {dev.logo
                  ? <img src={dev.logo} alt={dev.name} className="w-full h-full object-contain" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  : <Building2 className="h-5 w-5 text-muted-foreground" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-normal text-sm text-foreground truncate">{dev.name}</p>
                  {dev.featured && (
                    <span className="text-[10px] bg-secondary/20 text-secondary font-normal px-1.5 py-0.5 rounded uppercase shrink-0">Featured</span>
                  )}
                </div>
                {dev.cities.length > 0 && <p className="text-xs text-muted-foreground mt-0.5">{dev.cities.join(", ")}</p>}
                {dev.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{dev.description}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => { setEditing(dev); setShowForm(true); }} className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteConfirm(dev.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <Card className="p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-normal text-foreground">Delete Developer?</p>
                <p className="text-sm text-muted-foreground mt-1">"{developers.find(d => d.id === deleteConfirm)?.name}" will be removed.</p>
              </div>
              <button onClick={() => setDeleteConfirm(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-white" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Form with Cloudinary logo upload (Step 7b) ──────────────────────────────
function DeveloperForm({ initial, onSave, onCancel }: {
  initial?:  AdminDeveloper;
  onSave:    (data: Omit<AdminDeveloper, "id">) => void;
  onCancel:  () => void;
}) {
  const [form, setForm] = useState({
    name:        initial?.name           ?? "",
    slug:        initial?.slug           ?? "",
    logo:        initial?.logo           ?? "",
    description: initial?.description   ?? "",
    cities:      initial?.cities?.join(", ") ?? "",
    featured:    initial?.featured       ?? false,
  });

  const set = (f: string, v: unknown) => setForm(p => ({ ...p, [f]: v }));

  const handleSave = () => {
    onSave({
      name:        form.name,
      slug:        form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      logo:        form.logo,
      description: form.description,
      cities:      form.cities.split(",").map(c => c.trim()).filter(Boolean),
      featured:    form.featured,
    });
  };

  const cls = "w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
  const lbl = "text-xs font-normal text-muted-foreground uppercase tracking-wide block mb-1.5";

  return (
    <div className="space-y-6 max-w-xl">
      <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
      <h2 className="text-lg font-normal text-foreground">{initial ? "Edit Developer" : "Add Developer"}</h2>

      {/* ── Logo upload ── */}
      <Card className="p-5 space-y-4">
        <p className="text-sm font-normal text-foreground">Developer Logo</p>

        {/* Cloudinary upload */}
        <ImageUpload
          folder="developers"
          label="Upload logo"
          hint="PNG or WebP with transparent background · Max 2MB"
          currentUrl={form.logo || undefined}
          onUploadComplete={(r) => set("logo", r.url)}
          onRemove={() => set("logo", "")}
        />

        {/* Preview + paste URL fallback */}
        <div className="flex items-center gap-3">
          {form.logo && (
            <div className="w-20 h-14 rounded-lg border border-border bg-white flex items-center justify-center p-2 shrink-0">
              <img src={form.logo} alt="logo preview" className="w-full h-full object-contain" />
            </div>
          )}
          <div className="flex-1">
            <label className={lbl}>Or paste logo URL</label>
            <input
              value={form.logo}
              onChange={e => set("logo", e.target.value)}
              placeholder="https://res.cloudinary.com/…"
              className={cls}
            />
          </div>
        </div>
      </Card>

      {/* ── Details ── */}
      <Card className="p-5 space-y-4">
        <p className="text-sm font-normal text-foreground">Details</p>

        <div>
          <label className={lbl}>Developer Name *</label>
          <input
            value={form.name}
            onChange={e => {
              set("name", e.target.value);
              if (!initial) set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
            }}
            placeholder="e.g. Prestige Group"
            className={cls}
          />
        </div>

        <div>
          <label className={lbl}>URL Slug</label>
          <input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="e.g. prestige-group" className={cls} />
        </div>

        <div>
          <label className={lbl}>Description</label>
          <input value={form.description} onChange={e => set("description", e.target.value)} placeholder="Short description of the developer" className={cls} />
        </div>

        <div>
          <label className={lbl}>Cities (comma separated)</label>
          <input value={form.cities} onChange={e => set("cities", e.target.value)} placeholder="Bangalore, Hyderabad, Chennai" className={cls} />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="dev-ft" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-primary" />
          <label htmlFor="dev-ft" className="text-sm text-foreground cursor-pointer">Featured on homepage marquee</label>
        </div>
      </Card>

      <div className="flex gap-3 pb-8">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSave}>
          {initial ? "Save Changes" : "Add Developer"}
        </Button>
      </div>
    </div>
  );
}