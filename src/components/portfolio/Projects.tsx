import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useList } from "@/lib/cms";

interface DbProject {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  technologies: string[] | null;
  thumbnail_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  visible: boolean;
}

const gradients = [
  "from-purple-500 to-blue-500",
  "from-cyan-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-purple-500",
  "from-indigo-500 to-blue-500",
  "from-fuchsia-500 to-cyan-500",
];

export function Projects() {
  const { data: projects = [], isLoading } = useList<DbProject>("projects");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Featured selected work"
          subtitle="A curated set of recent builds across AI, web, automation and security."
        />

        {categories.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  filter === c
                    ? "bg-[var(--gradient-primary)] text-white shadow-[var(--shadow-glow-purple)]"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="glass mx-auto max-w-md rounded-2xl p-8 text-center text-sm text-muted-foreground">
            No projects yet. Add some from the admin panel.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const gradient = gradients[i % gradients.length];
              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group glass overflow-hidden rounded-2xl transition hover:border-accent/50 hover:shadow-[var(--shadow-glow-purple)]"
                >
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${gradient}`}>
                    {p.thumbnail_url && (
                      <img src={p.thumbnail_url} alt={p.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 font-display text-2xl font-bold text-white drop-shadow-lg">
                      {p.title}
                    </div>
                  </div>
                  <div className="p-6">
                    {p.category && <span className="text-xs uppercase tracking-wider text-accent">{p.category}</span>}
                    {p.description && <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>}
                    {p.technologies && p.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.technologies.map((t) => (
                          <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {(p.demo_url || p.github_url) && (
                      <div className="mt-5 flex gap-3">
                        {p.demo_url && (
                          <a href={p.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gradient-primary)] px-3 py-1.5 text-sm text-white transition hover:scale-105">
                            <ExternalLink size={14} /> Live
                          </a>
                        )}
                        {p.github_url && (
                          <a href={p.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10">
                            <Github size={14} /> Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
