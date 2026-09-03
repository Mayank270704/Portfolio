import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { CertificateCard } from "@/components/certificates/certificate-card";
import { Reveal } from "@/components/motion/reveal";
import { certificates } from "@/data/certificates";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Certificates",
  description: "Certifications and credentials, each with its issuer and verification link.",
  path: "/certificates",
});

export default function CertificatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certificates"
        title="Credentials, with something to verify them against."
        lede="Each entry carries its issuer, issue date, and a verification link where the issuer provides one."
        meta={certificates.length > 0 ? `${certificates.length} listed` : undefined}
      />

      <Section flush>
        {certificates.length === 0 ? (
          <EmptyState
            eyebrow="Certificates"
            title="Credentials are being verified before they go up"
            body="Anything listed here will carry its issuer, issue date, and a link the reader can check for themselves. Entries appear as that verification is completed."
          />
        ) : (
          <Reveal className="grid gap-6 sm:grid-cols-2">
            {certificates.map((certificate) => (
              <div key={certificate.id} data-reveal className="h-full">
                <CertificateCard certificate={certificate} />
              </div>
            ))}
          </Reveal>
        )}
      </Section>
    </>
  );
}
