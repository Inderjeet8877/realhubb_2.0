// src/admin/CloudinaryTest.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Quick test page — visit /admin/test to verify Cloudinary is connected
// Delete this file after confirming uploads work
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { CLOUDINARY_CONFIG } from "@/lib/cloudinary";
import ImageUpload from "./components/ImageUpload";
import { UploadResult } from "@/lib/uploadToCloudinary";

export default function CloudinaryTest() {
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  const cloudNameSet  = !!CLOUDINARY_CONFIG.cloudName   && CLOUDINARY_CONFIG.cloudName   !== "undefined";
  const presetSet     = !!CLOUDINARY_CONFIG.uploadPreset && CLOUDINARY_CONFIG.uploadPreset !== "undefined";
  const configValid   = cloudNameSet && presetSet;

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <div>
        <h1 className="text-xl font-normal text-foreground">Cloudinary Connection Test</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Verify your .env.local is configured correctly
        </p>
      </div>

      {/* Config status */}
      <Card className="p-5 space-y-3">
        <p className="text-sm font-normal text-foreground">Environment Variables</p>

        <div className="space-y-2">
          <ConfigRow
            label="VITE_CLOUDINARY_CLOUD_NAME"
            value={CLOUDINARY_CONFIG.cloudName}
            ok={cloudNameSet}
          />
          <ConfigRow
            label="VITE_CLOUDINARY_UPLOAD_PRESET"
            value={CLOUDINARY_CONFIG.uploadPreset}
            ok={presetSet}
          />
        </div>

        {!configValid && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-normal">Setup incomplete</p>
              <p className="mt-0.5">
                Create <code className="bg-amber-100 px-1 rounded">.env.local</code> in your
                project root and add the two Cloudinary variables. Then restart{" "}
                <code className="bg-amber-100 px-1 rounded">npm run dev</code>.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Upload test */}
      {configValid && (
        <Card className="p-5 space-y-4">
          <p className="text-sm font-normal text-foreground">Test Upload</p>
          <ImageUpload
            folder="properties"
            label="Test image (properties folder)"
            hint="Upload any test image to confirm Cloudinary works"
            onUploadComplete={(result) => setUploadResult(result)}
          />

          {uploadResult && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 space-y-1">
              <p className="flex items-center gap-1.5 text-sm font-normal text-green-800">
                <CheckCircle className="h-4 w-4" />
                Upload successful!
              </p>
              <p className="text-xs text-green-700">
                Image stored at:{" "}
                <a
                  href={uploadResult.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-mono"
                >
                  {uploadResult.url}
                </a>
              </p>
              <p className="text-xs text-green-600">
                Public ID: <span className="font-mono">{uploadResult.publicId}</span>
              </p>
            </div>
          )}
        </Card>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Delete <code>CloudinaryTest.tsx</code> and the <code>/admin/test</code> route after confirming setup works.
      </p>
    </div>
  );
}

function ConfigRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <code className="text-xs text-muted-foreground">{label}</code>
      <div className="flex items-center gap-1.5">
        {ok ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-700 font-mono">{value}</span>
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 text-destructive" />
            <span className="text-xs text-destructive">Not set</span>
          </>
        )}
      </div>
    </div>
  );
}