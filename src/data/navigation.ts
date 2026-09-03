export type NavItem = {
  title: string;
  href: string;
  /** Two-digit ordinal used by the mobile menu and page headers. */
  index: string;
  description: string;
};

export const homeItem: NavItem = {
  title: "Home",
  href: "/",
  index: "00",
  description: "Overview and selected work",
};

/**
 * The single authoritative navigation source. Header, mobile menu, footer, and
 * the sitemap all read this — there is no second copy anywhere.
 */
export const navigation: NavItem[] = [
  {
    title: "About",
    href: "/about",
    index: "01",
    description: "Background, education, and experience",
  },
  {
    title: "Skills",
    href: "/skills",
    index: "02",
    description: "The technical ground, layer by layer",
  },
  {
    title: "Projects",
    href: "/projects",
    index: "03",
    description: "Case studies with problem, approach, and result",
  },
  {
    title: "Certificates",
    href: "/certificates",
    index: "04",
    description: "Credentials with verification links",
  },
  {
    title: "Resume",
    href: "/resume",
    index: "05",
    description: "The short version, plus the PDF",
  },
  {
    title: "Contact",
    href: "/contact",
    index: "06",
    description: "Direct lines, no forms in the way",
  },
];

/** Every crawlable static route, home included. */
export const staticRoutes: NavItem[] = [homeItem, ...navigation];

export function getNavItem(href: string): NavItem | undefined {
  return staticRoutes.find((item) => item.href === href);
}

/**
 * Marks a section active for its own page and for anything nested under it, so
 * `/projects/some-slug` still highlights Projects.
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
