import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Surface } from "@/components/ui/surface";
import { PendingNotice } from "@/components/ui/pending-notice";
import { Reveal } from "@/components/motion/reveal";
import { certificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Verified certifications and credentials.",
};

export default function CertificatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certificates"
        title="Credentials, with something to verify them against."
        lede="Each entry carries its issuer, issue date, and a verification link — a certificate without one is not worth listing."
        meta={certificates.length > 0 ? `${certificates.length} listed` : "00"}
      />

      <Section flush>
        {certificates.length === 0 ? (
          <PendingNotice
            title="No certificates listed yet"
            body="The layout renders issuer, date, credential ID, and a verification link for each entry. Nothing is displayed until those details are real and checkable."
            requires={[
              "Certificate title and issuing organisation",
              "Issue date",
              "Credential ID, where one exists",
              "Public verification URL",
            ]}
          />
        ) : (
          <Reveal className="grid gap-6 sm:grid-cols-2">
            {certificates.map((certificate) => (
              <div key={certificate.id} data-reveal>
                <Surface className="flex h-full flex-col gap-5 p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent">
                      {certificate.issuer}
                    </span>
                    <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fg-subtle tabular">
                      {certificate.issued}
                    </span>
                  </div>
                  <h2 className="text-xl">{certificate.title}</h2>
                  <p className="text-sm leading-relaxed text-fg-muted">{certificate.summary}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
                    <span className="font-mono text-[0.625rem] tracking-[0.1em] text-fg-subtle">
                      {certificate.credentialId ?? "—"}
                    </span>
                    {certificate.verifyUrl ? (
                      <a
                        href={certificate.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[0.6875rem] text-accent hover:text-accent-bright"
                      >
                        Verify &rarr;
                      </a>
                    ) : null}
                  </div>
                </Surface>
              </div>
            ))}
          </Reveal>
        )}
      </Section>
    </>
  );
}
