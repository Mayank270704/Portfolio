import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Surface } from "@/components/ui/surface";
import { resume } from "@/data/resume";
import { joinMeta } from "@/lib/format";

/**
 * Download and preview for the resume PDF.
 *
 * When the file is not available no anchor is rendered at all, so there is
 * never a link pointing at a missing document.
 */
export function ResumePanel() {
  const { available, url, fileName, updated, sizeLabel } = resume.file;

  if (!available || !url) {
    return (
      <EmptyState
        eyebrow="Resume"
        title="The downloadable resume is being finalised"
        body="Everything in the PDF is already on this page — education, experience, focus areas, and the technical ground. The file will be linked here once it is ready."
      />
    );
  }

  const meta = joinMeta(["PDF", updated ? `Updated ${updated}` : null, sizeLabel]);

  return (
    <div className="flex flex-col gap-6">
      <Surface tone="raised" className="flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">Download</span>
          <h2 className="text-2xl">Full resume</h2>
          {meta ? (
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle">{meta}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={url} external size="lg" download={fileName}>
            Download PDF
          </Button>
          <Button href={url} external variant="outline" size="lg">
            Open in new tab
          </Button>
        </div>
      </Surface>

      <Surface className="overflow-hidden">
        <iframe
          src={url}
          title="Resume preview"
          className="h-[38rem] w-full border-0 bg-well"
          loading="lazy"
        />
      </Surface>
    </div>
  );
}
