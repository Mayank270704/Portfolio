/**
 * Renders a date range, leaving the end open when the entry is ongoing.
 */
export function formatPeriod(
  start: string,
  end: string | null | undefined,
  ongoingLabel = "Present",
) {
  const from = start.trim();
  const to = end?.trim();

  if (!from) return to ?? "";
  return `${from} — ${to || ongoingLabel}`;
}

/**
 * `["a", "b"]` -> `"a · b"`, skipping anything absent.
 */
export function joinMeta(parts: Array<string | null | undefined>, separator = " · ") {
  return parts.filter((part): part is string => Boolean(part && part.trim())).join(separator);
}
