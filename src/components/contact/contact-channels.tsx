import type { ContactChannel } from "@/data/profile";

/**
 * Renders confirmed channels as links. An unconfirmed channel is shown as a
 * quiet, honest row rather than a link that may 404.
 */
export function ContactChannels({
  live,
  pending,
}: {
  live: ContactChannel[];
  pending: ContactChannel[];
}) {
  return (
    <ul className="flex flex-col">
      {live.map((channel) => (
        <li key={channel.id}>
          <a
            href={channel.href ?? undefined}
            {...(channel.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="group flex items-center justify-between gap-6 border-t border-line py-8 first:border-t-0 first:pt-0"
          >
            <span className="flex flex-col gap-2">
              <span className="eyebrow">{channel.label}</span>
              <span className="font-display text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-2xl">
                {channel.value}
              </span>
            </span>
            <span
              aria-hidden
              className="font-mono text-lg text-fg-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
            >
              &rarr;
            </span>
          </a>
        </li>
      ))}

      {pending.map((channel) => (
        <li
          key={channel.id}
          className="flex items-center justify-between gap-6 border-t border-line py-8 first:border-t-0 first:pt-0"
        >
          <span className="flex flex-col gap-2">
            <span className="eyebrow">{channel.label}</span>
            <span className="font-display text-xl font-semibold tracking-tight text-fg-subtle sm:text-2xl">
              Publishing soon
            </span>
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        </li>
      ))}
    </ul>
  );
}
