export type NavItem = {
  title: string;
  href: string;
  index: string;
};

export const navigation: NavItem[] = [
  { title: "About", href: "/about", index: "01" },
  { title: "Skills", href: "/skills", index: "02" },
  { title: "Projects", href: "/projects", index: "03" },
  { title: "Certificates", href: "/certificates", index: "04" },
  { title: "Resume", href: "/resume", index: "05" },
  { title: "Contact", href: "/contact", index: "06" },
];
