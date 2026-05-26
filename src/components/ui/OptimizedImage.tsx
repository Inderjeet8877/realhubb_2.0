// src/components/ui/OptimizedImage.tsx
import { imagePresets } from "@/lib/cloudinary";

type ImagePreset = keyof typeof imagePresets;

interface OptimizedImageProps {
  src:        string;
  preset:     ImagePreset;
  width:      number;
  height:     number;
  alt:        string;
  priority?:  boolean;
  className?: string;
}

const OptimizedImage = ({
  src,
  preset,
  width,
  height,
  alt,
  priority  = false,
  className = "",
}: OptimizedImageProps) => {
  const optimizedSrc = src ? imagePresets[preset](src) : "";

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`w-full h-auto block ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
};

export default OptimizedImage;