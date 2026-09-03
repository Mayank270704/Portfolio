import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/motion/reveal";
import { certificates } from "@/data/certificates";

/** The homepage shows at most this many credentials. */
export const CERTIFICATE_PREVIEW_LIMIT = 4;

/**
 * Credential preview. Handles a certificate with no image and one with no
 * verification link without either case looking like a gap.
 */
export function CertificatesPreview() {
  const preview = certificates.slice(0, CERTIFICATE_PREVIEW_LIMIT);

  return (
    <Section labelledBy="certificates-heading">
      <Reveal className="flex flex-col gap-12">
        <div data-reveal>
          <SectionHeading
            id="certificates-heading"
            eyebrow="Credentials"
            title="Certified, and checkable"
            lede="Each one carries its issuer, date, and a link you can verify for yourself."
            action={
              <Button href="/certificates" variant="outline" size="sm">
                All certificates
              </Button>
            }
          />
        </div>

        {preview.length === 0 ? (
          <div data-reveal>
            <EmptyState
              eyebrow="Credentials"
              title="Certificates are being verified before they go up"
              body="Three are on the way. Each will carry its issuer, issue date, and a link the reader can check independently."
            />
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {preview.map((certificate) => (
              <li key={certificate.id} data-reveal className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-line-strong">
                  {certificate.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-well">
                      <Image
                        src={certificate.image.src}
                        alt={certificate.image.alt}
                        width={certificate.image.width}
                        height={certificate.image.height}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent">
                        {certificate.issuer}
                      </span>
                      {certificate.issued ? (
                        <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fg-subtle tabular">
                          {certificate.issued}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-lg leading-snug">{certificate.title}</h3>

                    <div className="mt-auto pt-2">
                      {certificate.documentUrl ? (
                        <a
                          href={certificate.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[0.6875rem] text-accent transition-colors hover:text-accent-bright"
                        >
                          View certificate &rarr;
                          <span className="sr-only"> {certificate.title}</span>
                        </a>
                      ) : (
                        <span className="font-mono text-[0.6875rem] text-fg-subtle">
                          {certificate.credentialId ? `ID ${certificate.credentialId}` : " "}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </Section>
  );
}
