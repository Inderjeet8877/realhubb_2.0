// src/hooks/useDevelopers.ts
// ─────────────────────────────────────────────────────────────────────────────
// FIX SUMMARY:
//   - getDevelopers() in firestoreService now does a plain scan (no orderBy)
//     so Firestore index errors no longer cause the "Local only" fallback.
//   - Merge strategy: hardcoded developer data (which has rich fields like
//     keyLocations, projectsCompleted, awards, timeline etc.) is kept as the
//     base. Only the fields an admin can edit (logo, name, description,
//     featured, cities) are overridden from Firestore.
//   - If Firestore has a developer NOT in hardcoded data (newly added via
//     admin), it is appended to the list with safe defaults.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { getDevelopers } from "@/lib/firestoreService";
import { developers as hardcodedDevelopers } from "@/data/developers";

export function useDevelopers() {
  const [developers,    setDevelopers]    = useState(hardcodedDevelopers);
  const [loading,       setLoading]       = useState(true);
  const [fromFirestore, setFromFirestore] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const fsData = await getDevelopers();

        if (fsData.length > 0) {
          // 1. Update existing hardcoded developers with admin-editable fields
          const merged = hardcodedDevelopers.map(hc => {
            const fs = fsData.find((d: any) => d.slug === hc.slug);
            if (!fs) return hc;
            return {
              ...hc,
              // Only override fields editable in admin panel
              logo:        (fs as any).logo        || hc.logo,
              name:        (fs as any).name        || hc.name,
              description: (fs as any).description || hc.description,
              featured:    (fs as any).featured    ?? hc.featured,
              // `cities` from admin is a string[] of city names
              // `keyLocations` used by the public page — keep in sync
              keyLocations: (fs as any).cities?.length
                ? (fs as any).cities
                : hc.keyLocations,
            };
          });

          // 2. Append any Firestore-only developers (added via admin, not in hardcoded)
          const hardcodedSlugs = new Set(hardcodedDevelopers.map(d => d.slug));
          const newDevs = fsData
            .filter((d: any) => !hardcodedSlugs.has(d.slug))
            .map((d: any) => ({
              // Provide safe defaults for all fields the public page expects
              id:                  d.id          ?? "",
              slug:                d.slug        ?? "",
              name:                d.name        ?? "",
              logo:                d.logo        ?? "",
              description:         d.description ?? "",
              headquarters:        d.cities?.[0] ?? "India",
              established:         d.established ?? 2000,
              projectsCompleted:   d.projectsCompleted ?? 0,
              ongoingProjects:     d.ongoingProjects   ?? 0,
              keyLocations:        d.cities            ?? [],
              operatesIn:          d.cities?.join(", ") ?? "",
              customerRating:      d.customerRating    ?? 4.0,
              designPhilosophy:    d.designPhilosophy  ?? "",
              deliveryReputation:  d.deliveryReputation ?? "",
              reraInfo:            d.reraInfo          ?? "",
              featured:            d.featured          ?? false,
              awards:              d.awards            ?? [],
              iconicProjects:      d.iconicProjects     ?? [],
              ongoingProjectsList: d.ongoingProjectsList ?? [],
              timeline:            d.timeline           ?? [],
            }));

          setDevelopers([...merged, ...newDevs] as typeof hardcodedDevelopers);
          setFromFirestore(true);
        }
        // If Firestore returns empty, keep hardcoded — no change needed
      } catch (e) {
        console.error("[useDevelopers] Firestore error:", e);
        // keep hardcoded fallback — no state change needed
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { developers, loading, fromFirestore };
}