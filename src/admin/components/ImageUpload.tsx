// src/admin/components/ImageUpload.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable image upload component for the RealHubb admin panel
// Supports: drag & drop, click to browse, progress bar, preview, copy URL
// Usage:
//   <ImageUpload
//     folder="properties"
//     label="Property Cover Image"
//     onUploadComplete={(url) => setImageUrl(url)}
//   />
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import {
  Upload,
  X,
  CheckCircle,
  Copy,
  ImageIcon,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { CloudinaryFolder, imagePresets } from "@/lib/cloudinary";
import {
  uploadToCloudinary,
  validateImageFile,
  formatBytes,
  UploadResult,
} from "@/lib/uploadToCloudinary";

interface ImageUploadProps {
  folder:             CloudinaryFolder;
  label?:             string;
  hint?:              string;
  currentUrl?:        string;                    // existing image to show
  onUploadComplete:   (result: UploadResult) => void;
  onRemove?:          () => void;
  maxWidth?:          number;                    // for preview optimization
  maxHeight?:         number;
}

type UploadState = "idle" | "uploading" | "success" | "error";

export default function ImageUpload({
  folder,
  label       = "Upload Image",
  hint,
  currentUrl,
  onUploadComplete,
  onRemove,
  maxWidth    = 600,
  maxHeight   = 400,
}: ImageUploadProps) {
  const [state,       setState]       = useState<UploadState>("idle");
  const [progress,    setProgress]    = useState(0);
  const [preview,     setPreview]     = useState<string | null>(currentUrl ?? null);
  const [result,      setResult]      = useState<UploadResult | null>(null);
  const [error,       setError]       = useState<string | null>(null);
  const [isDragging,  setIsDragging]  = useState(false);
  const [copied,      setCopied]      = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Process the selected file ─────────────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    // Validate
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      setState("error");
      return;
    }

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError(null);
    setState("uploading");
    setProgress(0);

    try {
      const uploadResult = await uploadToCloudinary(file, {
        folder,
        onProgress: setProgress,
      });

      setResult(uploadResult);
      setState("success");
      onUploadComplete(uploadResult);

      // Replace blob preview with optimized Cloudinary URL
      setPreview(
        imagePresets.thumbnail(uploadResult.url)
      );

      // Clean up object URL
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(null);
      URL.revokeObjectURL(objectUrl);
    }
  }, [folder, onUploadComplete]);

  // ─── Input change ───────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = ""; // allow re-selecting same file
  };

  // ─── Drag & drop ───────────────────────────────────────────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // ─── Copy URL ──────────────────────────────────────────────────────────────
  const copyUrl = async () => {
    if (!result?.url) return;
    await navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Remove / reset ────────────────────────────────────────────────────────
  const handleRemove = () => {
    setPreview(null);
    setResult(null);
    setState("idle");
    setProgress(0);
    setError(null);
    onRemove?.();
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <p className="text-xs font-normal text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
      )}

      {/* Drop zone */}
      <Card
        className={`relative border-2 border-dashed transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : state === "error"
            ? "border-destructive/50 bg-destructive/5"
            : state === "success"
            ? "border-green-400/50 bg-green-50/50"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* ── Preview state (has image) ── */}
        {preview && state !== "uploading" ? (
          <div className="p-4">
            <div className="relative group w-full">
              <img
                src={preview}
                alt="Upload preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              {/* Remove button */}
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              {/* Success badge */}
              {state === "success" && (
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  Uploaded
                </div>
              )}
            </div>

            {/* URL row */}
            {result && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-lg px-3 py-2 text-xs text-muted-foreground font-mono truncate">
                  {result.url}
                </div>
                <button
                  onClick={copyUrl}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    copied
                      ? "bg-green-100 text-green-700"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {copied
                    ? <><CheckCircle className="h-3 w-3" /> Copied</>
                    : <><Copy className="h-3 w-3" /> Copy URL</>
                  }
                </button>
              </div>
            )}

            {/* File info */}
            {result && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                {result.width} × {result.height}px · {formatBytes(result.sizeBytes)} · stored in{" "}
                <span className="font-medium">realhubb/{folder}</span>
              </p>
            )}
          </div>
        ) : state === "uploading" ? (
          // ── Uploading state ──
          <div className="p-8 flex flex-col items-center gap-4">
            {preview && (
              <img
                src={preview}
                alt="Uploading preview"
                className="w-24 h-24 object-cover rounded-lg opacity-60"
              />
            )}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading to Cloudinary…
                </span>
                <span className="font-normal text-foreground">{progress}%</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          // ── Idle / error state — click or drag ──
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full p-8 flex flex-col items-center gap-3 text-center"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              state === "error" ? "bg-destructive/10" : "bg-muted"
            }`}>
              {state === "error"
                ? <AlertCircle className="h-6 w-6 text-destructive" />
                : <ImageIcon className="h-6 w-6 text-muted-foreground" />
              }
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                {isDragging ? "Drop image here" : "Click to upload or drag & drop"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {hint ?? "JPG, PNG, WebP · Max 10MB"}
              </p>
            </div>

            {state === "error" && error && (
              <p className="text-xs text-destructive font-medium">{error}</p>
            )}
          </button>
        )}
      </Card>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}