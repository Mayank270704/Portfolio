import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Mayank Swaroop Nandan. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          {navigation.slice(0, 4).map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-orange-300">
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
