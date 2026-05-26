// src/admin/sections/TeamManager.tsx
import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Pencil, Trash2, X, UserCircle } from "lucide-react";
import { teamMembers as initialData } from "@/data/team";
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/firestoreService";
import ImageUpload from "../components/ImageUpload";

export interface AdminTeamMember {
  id:       string;
  name:     string;
  role:     string;
  photo:    string;
  linkedin: string;
  bio:      string;
  order:    number;
}

function mapMember(m: any, i: number): AdminTeamMember {
  return {
    id:       m.id       ?? `tm-${String(i + 1).padStart(3, "0")}`,
    name:     m.name     ?? "",
    role:     m.role     ?? m.designation ?? m.title ?? "",
    photo:    typeof m.photo === "string" ? m.photo : (typeof m.image === "string" ? m.image : ""),
    linkedin: m.linkedin ?? m.linkedIn ?? "",
    bio:      m.bio      ?? m.description ?? "",
    order:    m.order    ?? i,
  };
}

export default function TeamManager() {
  const [members,       setMembers]       = useState<AdminTeamMember[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [firestoreOk,   setFirestoreOk]   = useState(false);
  const [search,        setSearch]        = useState("");
  const [showForm,      setShowForm]      = useState(false);
  const [editing,       setEditing]       = useState<AdminTeamMember | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTeamMembers();
        if (data.length > 0) {
          setMembers(data);
          setFirestoreOk(true);
        } else {
          setMembers(initialData.map(mapMember));
        }
      } catch {
        setMembers(initialData.map(mapMember));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() =>
    members
      .sort((a, b) => a.order - b.order)
      .filter(m =>
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase())
      ),
    [members, search]);

  const handleDelete = async (id: string) => {
    try {
      if (firestoreOk) await deleteTeamMember(id);
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (e) { console.error(e); }
    setDeleteConfirm(null);
  };

  const handleSave = async (data: Omit<AdminTeamMember, "id">) => {
    try {
      if (editing) {
        if (firestoreOk) await updateTeamMember(editing.id, data);
        setMembers(prev => prev.map(m => m.id === editing.id ? { ...data, id: editing.id } : m));
      } else {
        if (firestoreOk) {
          const created = await addTeamMember(data);
          setMembers(prev => [...prev, created]);
        } else {
          const id = `tm-${String(members.length + 1).padStart(3, "0")}`;
          setMembers(prev => [...prev, { ...data, id }]);
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
          Loading team…
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <TeamMemberForm
        initial={editing ?? undefined}
        totalMembers={members.length}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditing(null); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{filtered.length} of {members.length} members</p>
            {firestoreOk
              ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Live · Firestore</span>
              : <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Local only</span>
            }
          </div>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="h-4 w-4" /> Add Member
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or role…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(member => (
          <Card key={member.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-muted shrink-0 border border-border">
                {member.photo
                  ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  : <div className="w-full h-full flex items-center justify-center"><UserCircle className="h-8 w-8 text-muted-foreground" /></div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-normal text-sm text-foreground truncate">{member.name}</p>
                <p className="text-xs text-primary mt-0.5 truncate">{member.role}</p>
                {member.bio && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{member.bio}</p>}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block truncate">LinkedIn ↗</a>
                )}
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={() => { setEditing(member); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setDeleteConfirm(member.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
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
                <p className="font-normal text-foreground">Remove Team Member?</p>
                <p className="text-sm text-muted-foreground mt-1">"{members.find(m => m.id === deleteConfirm)?.name}" will be removed.</p>
              </div>
              <button onClick={() => setDeleteConfirm(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-white" onClick={() => handleDelete(deleteConfirm)}>Remove</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
function TeamMemberForm({ initial, totalMembers, onSave, onCancel }: {
  initial?:     AdminTeamMember;
  totalMembers: number;
  onSave:       (data: Omit<AdminTeamMember, "id">) => void;
  onCancel:     () => void;
}) {
  const [form, setForm] = useState({
    name:     initial?.name     ?? "",
    role:     initial?.role     ?? "",
    photo:    initial?.photo    ?? "",
    linkedin: initial?.linkedin ?? "",
    bio:      initial?.bio      ?? "",
    order:    initial?.order    ?? totalMembers,
  });

  const set = (f: string, v: unknown) => setForm(p => ({ ...p, [f]: v }));
  const cls = "w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
  const lbl = "text-xs font-normal text-muted-foreground uppercase tracking-wide block mb-1.5";

  return (
    <div className="space-y-6 max-w-xl">
      <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
      <h2 className="text-lg font-normal text-foreground">{initial ? "Edit Team Member" : "Add Team Member"}</h2>

      {/* Photo */}
      <Card className="p-5 space-y-4">
        <p className="text-sm font-normal text-foreground">Profile Photo</p>
        <ImageUpload
          folder="team"
          label="Upload photo"
          hint="Square photo recommended · JPG or WebP · Max 5MB"
          currentUrl={form.photo || undefined}
          onUploadComplete={r => set("photo", r.url)}
          onRemove={() => set("photo", "")}
        />
        <div className="flex items-center gap-3">
          {form.photo && (
            <div className="w-14 h-14 rounded-full overflow-hidden border border-border shrink-0">
              <img src={form.photo} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <label className={lbl}>Or paste photo URL</label>
            <input value={form.photo} onChange={e => set("photo", e.target.value)} placeholder="https://res.cloudinary.com/…" className={cls} />
          </div>
        </div>
      </Card>

      {/* Details */}
      <Card className="p-5 space-y-4">
        <p className="text-sm font-normal text-foreground">Details</p>
        <div><label className={lbl}>Full Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Rahul Sharma" className={cls} /></div>
        <div><label className={lbl}>Role / Designation *</label><input value={form.role} onChange={e => set("role", e.target.value)} placeholder="e.g. Co-Founder & CEO" className={cls} /></div>
        <div><label className={lbl}>LinkedIn URL</label><input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" className={cls} /></div>
        <div><label className={lbl}>Short Bio</label><textarea value={form.bio} onChange={e => set("bio", e.target.value)} rows={3} placeholder="Brief background…" className={`${cls} resize-none`} /></div>
        <div>
          <label className={lbl}>Display Order</label>
          <input type="number" value={form.order} onChange={e => set("order", parseInt(e.target.value) || 0)} min={0} className={cls} />
          <p className="text-xs text-muted-foreground mt-1">Lower = shown first. Current range: 0 to {totalMembers - 1}.</p>
        </div>
      </Card>

      <div className="flex gap-3 pb-8">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => onSave(form)}>
          {initial ? "Save Changes" : "Add Member"}
        </Button>
      </div>
    </div>
  );
}