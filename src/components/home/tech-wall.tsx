import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechWallGrid } from "@/components/home/tech-wall-grid";
import { Reveal } from "@/components/motion/reveal";
import { allSkills, skillCategories } from "@/data/skills";
import { TECH_ICON_SLUGS, TECH_LABELS } from "@/data/tech";

export type TechTile = {
  /** Stable identity, even when the same tile appears in more than one row. */
  name: string;
  label: string;
  /** SVG path data for the brand mark, or null for a typographic tile. */
  path: string | null;
  hex: string | null;
};

const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

function iconFor(name: string): { path: string | null; hex: string | null } {
  const slug = TECH_ICON_SLUGS[name];
  if (!slug) return { path: null, hex: null };

  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = icons[key];
  return icon ? { path: icon.path, hex: `#${icon.hex}` } : { path: null, hex: null };
}

/** Every technology already named in the skills data. Nothing is added here. */
function buildTiles(): TechTile[] {
  return allSkills.map((name) => ({
    name,
    label: TECH_LABELS[name] ?? name,
    ...iconFor(name),
  }));
}

/**
 * The technology wall.
 *
 * Brand marks are resolved here, on the server: only the SVG path strings reach
 * the browser, never the icon library.
 */
export function TechWall() {
  const tiles = buildTiles();

  return (
    <Section labelledBy="tech-heading" bleed>
      <Reveal className="shell">
        <div data-reveal>
          <SectionHeading
            id="tech-heading"
            eyebrow="Technology"
            title="What I build with"
            lede="The tools I actually reach for, grouped by the layer they belong to."
            action={
              <Button href="/skills" variant="outline" size="sm">
                All skills
              </Button>
            }
          />
        </div>
      </Reveal>

      <TechWallGrid tiles={tiles} />

      <Reveal className="shell mt-12">
        <ul data-reveal className="flex flex-wrap gap-x-8 gap-y-3">
          {skillCategories.map((category) => (
            <li
              key={category.id}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg-subtle"
            >
              {category.title}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
