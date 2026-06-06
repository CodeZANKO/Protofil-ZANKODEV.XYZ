import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Info,
  Sparkles,
  Briefcase,
  Wrench,
  Cpu,
  Mail,
  Share2,
  Search,
  Palette,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/lib/auth";

const items: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/hero", label: "Hero", icon: User },
  { to: "/admin/about", label: "About", icon: Info },
  { to: "/admin/skills", label: "Skills", icon: Sparkles },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/tools", label: "Tools", icon: Cpu },
  { to: "/admin/contact", label: "Contact", icon: Mail },
  { to: "/admin/social", label: "Social Links", icon: Share2 },
  { to: "/admin/seo", label: "SEO", icon: Search },
  { to: "/admin/appearance", label: "Appearance", icon: Palette },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  return (
    <>
      <button
        className="glass fixed left-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-lg lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-white/5 bg-background/80 backdrop-blur-xl transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-5">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--gradient-primary)] font-display text-lg font-bold text-white animate-pulse-glow">
              Z
            </div>
            <div>
              <div className="font-display text-sm font-semibold">Zanko CMS</div>
              <div className="text-xs text-muted-foreground">Admin Panel</div>
            </div>
          </Link>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-[var(--gradient-primary)] text-white shadow-[var(--shadow-glow-purple)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <item.icon size={16} className={active ? "" : "group-hover:text-accent"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
