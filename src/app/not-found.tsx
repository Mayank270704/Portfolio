import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/navigation";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70dvh] flex-col justify-center gap-10 py-32">
      <div className="flex flex-col gap-6">
        <span className="eyebrow">404</span>
        <h1 className="max-w-xl text-[clamp(2rem,5vw,3.5rem)]">This page does not exist.</h1>
        <p className="measure text-fg-muted">
          The link may be out of date, or the page has not been published yet.
        </p>
      </div>

      <div>
        <Button href="/">Back to home</Button>
      </div>

      <nav aria-label="Site sections" className="flex flex-col gap-4">
        <span className="eyebrow">Everything else</span>
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex flex-col gap-1 border-t border-line py-3 transition-colors hover:border-line-strong"
              >
                <span className="text-sm text-fg transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                <span className="text-[0.8125rem] leading-relaxed text-fg-subtle">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
