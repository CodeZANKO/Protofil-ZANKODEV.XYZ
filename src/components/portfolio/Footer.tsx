import { ArrowUp, Link as LinkIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { useList } from "@/lib/cms";

interface DbSocial {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
}

function resolveIcon(name: string | null) {
  if (!name) return LinkIcon;
  const I = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name];
  return I ?? LinkIcon;
}

export function Footer() {
  const { data: socials = [] } = useList<DbSocial>("social_links");
  return (
    <footer className="relative pt-10 pb-8">
      <div className="container mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-primary)] text-sm font-bold text-white">
              Z
            </div>
            <span className="font-display font-semibold">
              Zankodev<span className="text-gradient">.xyz</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Zanko. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = resolveIcon(s.icon);
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform}
                  className="glass grid h-9 w-9 place-items-center rounded-lg transition hover:border-accent hover:shadow-[var(--shadow-glow-cyan)]"
                >
                  <Icon size={15} />
                </a>
              );
            })}
            <a
              href="#home"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--gradient-primary)] shadow-[var(--shadow-glow-purple)] transition hover:scale-110"
            >
              <ArrowUp size={15} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
