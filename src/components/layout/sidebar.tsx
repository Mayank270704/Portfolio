"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  TerminalSquare,
  FolderGit2,
  Award,
  FileText,
  Mail,
  Home
} from "lucide-react";

const navItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "About", href: "/about", icon: User },
  { title: "Skills", href: "/skills", icon: TerminalSquare },
  { title: "Projects", href: "/projects", icon: FolderGit2 },
  { title: "Certificates", href: "/certificates", icon: Award },
  { title: "Resume", href: "/resume", icon: FileText },
  { title: "Contact", href: "/contact", icon: Mail },
];

export function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-3 backdrop-blur-xl xl:flex shadow-2xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <div key={item.title} className="group relative">
            <Link
              href={item.href}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
                isActive
                  ? "bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                  : "text-slate-400 hover:bg-white/10 hover:text-white hover:scale-110"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
            
            {/* Tooltip */}
            <div className="pointer-events-none absolute left-full ml-4 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-slate-900 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap shadow-lg">
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}
