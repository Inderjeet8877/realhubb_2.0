import { useState, useEffect } from "react";
import { getTeamMembers } from "@/lib/firestoreService";
import { teamMembers as hardcodedTeam } from "@/data/team";

export function useTeamMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fsData = await getTeamMembers();

        if (fsData.length > 0) {
          const hardcodedByName = new Map(
            (hardcodedTeam as any[]).map(m => [m.name, m])
          );

          const ordered = fsData.map((fs: any) => {
            const hc = hardcodedByName.get(fs.name) ?? {};
            return {
              email:       hc.email    ?? "",
              phone:       hc.phone    ?? "",
              id:          fs.id,
              name:        fs.name        || hc.name        || "",
              role:        fs.role        || hc.designation || hc.role || "",
              designation: fs.role        || hc.designation || hc.role || "",
              photo:       fs.photo       || hc.image       || hc.photo || "",
              image:       fs.photo       || hc.image       || hc.photo || "",
              linkedin:    fs.linkedin    || hc.linkedin    || "",
              bio:         fs.bio         || hc.bio         || "",
              order:       fs.order       ?? 999,
            };
          });

          ordered.sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));
          setMembers(ordered);
        } else {
          setMembers(
            (hardcodedTeam as any[]).map((m, i) => ({
              ...m,
              order:       i,
              role:        m.role        || m.designation || "",
              designation: m.designation || m.role        || "",
              photo:       m.photo       || m.image       || "",
              image:       m.image       || m.photo       || "",
            }))
          );
        }
      } catch (e) {
        console.error("[useTeamMembers] Firestore error:", e);
        setMembers(
          (hardcodedTeam as any[]).map((m, i) => ({
            ...m,
            order:       i,
            role:        m.role        || m.designation || "",
            designation: m.designation || m.role        || "",
            photo:       m.photo       || m.image       || "",
            image:       m.image       || m.photo       || "",
          }))
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { members, loading };
}
