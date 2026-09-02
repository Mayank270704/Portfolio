"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="shell flex min-h-[70dvh] flex-col justify-center gap-8 py-32">
      <span className="eyebrow text-signal-critical">Error</span>
      <h1 className="max-w-xl text-[clamp(2rem,5vw,3.5rem)]">Something broke while rendering.</h1>
      <p className="measure text-fg-muted">
        The page failed to load. Retrying usually resolves it.
      </p>
      <div>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
