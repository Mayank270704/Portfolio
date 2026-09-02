import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70dvh] flex-col justify-center gap-8 py-32">
      <span className="eyebrow">404</span>
      <h1 className="max-w-xl text-[clamp(2rem,5vw,3.5rem)]">This page does not exist.</h1>
      <p className="measure text-fg-muted">
        The link may be out of date, or the page has not been published yet.
      </p>
      <div>
        <Button href="/">Back to home</Button>
      </div>
    </div>
  );
}
