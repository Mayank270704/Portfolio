import Image from "next/image";
import { Surface } from "@/components/ui/surface";
import { Tag } from "@/components/ui/tag";
import type { Certificate } from "@/data/certificates";

/**
 * Renders a credential with or without an image, and with or without a
 * verification link. Nothing is stubbed in when a field is missing.
 */
export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const artwork = certificate.image ?? certificate.logo ?? null;

  return (
    <Surface as="article" className="flex h-full flex-col overflow-hidden">
      {artwork ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-well">
          <Image
            src={artwork.src}
            alt={artwork.alt}
            width={artwork.width}
            height={artwork.height}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-5 p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent">
            {certificate.issuer}
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fg-subtle tabular">
            {certificate.issued}
          </span>
        </div>

        <h2 className="text-xl leading-snug">{certificate.title}</h2>

        {certificate.description ? (
          <p className="text-sm leading-relaxed text-fg-muted">{certificate.description}</p>
        ) : null}

        {certificate.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {certificate.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="font-mono text-[0.625rem] tracking-[0.1em] text-fg-subtle">
            {certificate.credentialId ? `ID ${certificate.credentialId}` : "No credential ID"}
          </span>
          {certificate.credentialUrl ? (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.6875rem] text-accent transition-colors hover:text-accent-bright"
            >
              Verify &rarr;
              <span className="sr-only"> {certificate.title}</span>
            </a>
          ) : (
            <span className="font-mono text-[0.6875rem] text-fg-subtle">
              Verification link unavailable
            </span>
          )}
        </div>
      </div>
    </Surface>
  );
}
