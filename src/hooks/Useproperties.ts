// src/hooks/Useproperties.ts
import { useState, useEffect } from "react";
import { getProperties } from "@/lib/firestoreService";
import { currentProjects, ongoingProjects, Property as DataProperty } from "@/data/properties";
import { imagePresets } from "@/lib/cloudinary"; // ← add this import

export type { Property } from "@/data/properties";

function normalizeProperty(p: any): DataProperty {
  // Optimize all images in the array at normalization time — done once, not on every render
  const rawImages: string[] = Array.isArray(p.images)
    ? p.images
    : p.image       ? [p.image]
    : p.coverImage  ? [p.coverImage]
    : [];

  const optimizedImages = rawImages.map((url: string) =>
    imagePresets.propertyCard(url)  // ← transform once here, all cards/lists benefit
  );

  return {
    id:             p.id            ?? "",
    slug:           p.slug          ?? p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "",
    title:          p.title         ?? p.name ?? "",
    mapEmbedUrl:    p.mapEmbedUrl   ?? "",
    location:       p.location      ?? "",
    price:          p.price         ?? "",
    priceValue:     p.priceValue    ?? 0,
    type:           (p.type
                      ? p.type.charAt(0).toUpperCase() + p.type.slice(1).toLowerCase()
                      : "Apartment") as DataProperty["type"],
    bhk:            (p.bhk ?? p.bedrooms ?? "2BHK") as DataProperty["bhk"],
    status:         ((p.status === "ongoing" || p.status === "completed")
                      ? p.status : "ongoing") as DataProperty["status"],
    featured:       (p.featured === true || p.featured === "true") ? "true" : "",
    area:           p.area          ?? "",
    images:         optimizedImages, // ← use optimized array
    description:    p.description   ?? "",
    amenities:      Array.isArray(p.amenities)      ? p.amenities      : [],
    specifications: Array.isArray(p.specifications) ? p.specifications : [],
    completionDate: p.completionDate ?? p.possession ?? "",
    possession:     p.possession    ?? p.completionDate ?? "",
    city:           p.city          ?? "bangalore",
  };
}

// rest of the file is unchanged — keep exactly as-is below this line
function getProjectCategory(p: any): "ongoing" | "upcoming" {
  if (p.projectType === "upcoming") return "upcoming";
  if (p.projectType === "ongoing")  return "ongoing";
  if (p.status      === "upcoming") return "upcoming";
  return "ongoing";
}

const FALLBACK_ONGOING:  DataProperty[] = ongoingProjects.map(p => ({ ...normalizeProperty(p), featured: "" as const }));
const FALLBACK_UPCOMING: DataProperty[] = currentProjects.map(p  => ({ ...normalizeProperty(p), featured: "" as const }));

interface State {
  ongoing:       DataProperty[];
  upcoming:      DataProperty[];
  loading:       boolean;
  fromFirestore: boolean;
}

interface UsePropertiesResult {
  properties:    DataProperty[];
  ongoing:       DataProperty[];
  upcoming:      DataProperty[];
  featured:      DataProperty[];
  loading:       boolean;
  fromFirestore: boolean;
}

export function useProperties(): UsePropertiesResult {
  const [state, setState] = useState<State>({
    ongoing:       [],
    upcoming:      [],
    loading:       true,
    fromFirestore: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getProperties();
        if (data.length > 0) {
          const upArr:    DataProperty[] = [];
          const goingArr: DataProperty[] = [];
          data.forEach((d: any) => {
            const normalized = normalizeProperty(d);
            if (getProjectCategory(d) === "upcoming") upArr.push(normalized);
            else                                       goingArr.push(normalized);
          });
          setState({ ongoing: goingArr, upcoming: upArr, loading: false, fromFirestore: true });
        } else {
          setState({ ongoing: FALLBACK_ONGOING, upcoming: FALLBACK_UPCOMING, loading: false, fromFirestore: false });
        }
      } catch (e) {
        console.error("[useProperties] error:", e);
        setState({ ongoing: FALLBACK_ONGOING, upcoming: FALLBACK_UPCOMING, loading: false, fromFirestore: false });
      }
    })();
  }, []);

  const all = [...state.ongoing, ...state.upcoming];
  return {
    properties:    all,
    ongoing:       state.ongoing,
    upcoming:      state.upcoming,
    featured:      all.filter(p => p.featured === "true"),
    loading:       state.loading,
    fromFirestore: state.fromFirestore,
  };
}