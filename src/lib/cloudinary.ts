// src/lib/cloudinary.ts
// ─────────────────────────────────────────────────────────────────────────────
// Cloudinary configuration for RealHubb
// Upload endpoint uses unsigned upload preset — no API secret exposed
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";

export const CLOUDINARY_CONFIG = {
  cloudName:    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME   as string,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string,
};
 
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
 
export type CloudinaryFolder = "properties" | "blogs" | "developers" | "team";
 
export interface CloudinaryUploadResponse {
  secure_url:  string;
  public_id:   string;
  width:       number;
  height:      number;
  format:      string;
  bytes:       number;
  created_at:  string;
}
 
export function optimizeUrl(
  url: string,
  options: {
    width?:   number;
    height?:  number;
    quality?: "auto" | number;
    format?:  "auto" | "webp" | "jpg" | "png";
    crop?:    "fill" | "fit" | "scale" | "thumb";
  } = {}
): string {
  if (!url.includes("cloudinary.com")) return url;
 
  const {
    width,
    height,
    quality = "auto",
    format  = "auto",
    crop    = "fill",
  } = options;
 
  const transforms: string[] = [
    `f_${format}`,
    `q_${quality}`,
    width  ? `w_${width}`  : "",
    height ? `h_${height}` : "",
    width && height ? `c_${crop}` : "",
  ].filter(Boolean);
 
  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
}
 
export const imagePresets = {
  propertyCard:  (url: string) => optimizeUrl(url, { width: 600,  height: 400,  quality: "auto", format: "auto" }),
  propertyHero:  (url: string) => optimizeUrl(url, { width: 1200, height: 675,  quality: "auto", format: "auto" }),
  blogCover:     (url: string) => optimizeUrl(url, { width: 800,  height: 450,  quality: "auto", format: "auto" }),
  developerLogo: (url: string) => optimizeUrl(url, { width: 200,  height: 120,  quality: "auto", format: "auto", crop: "fit" }),
  teamPhoto:     (url: string) => optimizeUrl(url, { width: 400,  height: 400,  quality: "auto", format: "auto", crop: "thumb" }),
  thumbnail:     (url: string) => optimizeUrl(url, { width: 150,  height: 150,  quality: "auto", format: "auto", crop: "thumb" }),
};
 
export type ImagePreset = keyof typeof imagePresets;