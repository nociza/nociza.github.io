import type { ImgHTMLAttributes } from "react";
import data from "../../.generated/image-variants.json";

type Variant = { width: number; height: number; variants: { src: string; width: number }[] };
const manifest = data as Record<string, Variant>;
export default function ResponsiveImage({ src, alt, sizes = "(max-width: 640px) 90vw, 480px", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const entry = typeof src === "string" ? manifest[src] : undefined;
  return <img {...props} src={entry?.variants[0]?.src || src} alt={alt} sizes={sizes} srcSet={entry?.variants.length ? entry.variants.map(variant => `${variant.src} ${variant.width}w`).join(", ") : undefined} width={entry?.width} height={entry?.height} decoding="async" />;
}
