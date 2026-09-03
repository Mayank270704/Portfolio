import Image from "next/image";
import type { ImageAsset } from "@/data/types";

/**
 * Screenshots and architecture diagrams. Renders nothing when the project has
 * no gallery, so the case study simply omits the section.
 */
export function ProjectGallery({ images }: { images: ImageAsset[] }) {
  if (images.length === 0) return null;

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {images.map((image) => (
        <li key={image.src} className="flex flex-col gap-3">
          <figure className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-2xl border border-line bg-well">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
            {image.caption ? (
              <figcaption className="text-sm leading-relaxed text-fg-subtle">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
