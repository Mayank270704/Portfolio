import Link from "next/link";
import { navigation } from "@/data/navigation";
import { liveContactChannels, profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="shell flex flex-col gap-12 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <span className="eyebrow">Currently</span>
            <p className="text-[0.9375rem] leading-relaxed text-fg-muted">{profile.availability}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 md:gap-x-16">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="rule" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-fg-subtle">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          {liveContactChannels.length > 0 ? (
            <ul className="flex flex-wrap gap-6">
              {liveContactChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href ?? undefined}
                    {...(channel.id === "email"
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg-subtle transition-colors hover:text-accent"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Link
              href="/contact"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg-subtle transition-colors hover:text-accent"
            >
              Get in touch
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
