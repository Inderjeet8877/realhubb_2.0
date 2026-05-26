// src/admin/types/property.ts
export type PropertyStatus = "ongoing" | "upcoming";
export type PropertyCity   = "bangalore" | "hyderabad" | "chennai";
export type PropertyType   = "apartment" | "villa" | "plot" | "commercial";

export interface AdminProperty {
  id:          string;
  slug:        string;
  name:        string;
  developer:   string;
  city:        PropertyCity;
  location:    string;
  status:      PropertyStatus;
  type:        PropertyType;
  price:       string;
  priceValue:  number;
  area:        string;
  bedrooms:    string;
  images:      string[];     // ← array now, was single image
  rera:        string;
  possession:  string;
  description: string;
  featured:    boolean;
  amenities:   string[];
  mapEmbedUrl: string;
}

export const EMPTY_PROPERTY: Omit<AdminProperty, "id"> = {
  slug: "", name: "", developer: "", city: "bangalore",
  location: "", status: "ongoing", type: "apartment",
  price: "", priceValue: 0, area: "", bedrooms: "",
  images: [],                        // ← empty array
  rera: "", possession: "", description: "",
  featured: false, amenities: [], mapEmbedUrl: "",
};