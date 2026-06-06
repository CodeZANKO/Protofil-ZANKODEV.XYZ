import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useList } from "@/lib/cms";

interface DbService {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
}

function resolveIcon(name: string | null) {
  if (!name) return Sparkles;
  const I = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name];
  return I ?? Sparkles;
}

export function Services() {
  const { data: services = [], isLoading } = useList<DbService>("services");
  return (
    <section id="services" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Services"
          title="What I can do for you"
          subtitle="End-to-end services to design, build, and grow your next product."
        />

        {!isLoading && services.length === 0 && (
          <div className="glass mx-auto max-w-md rounded-2xl p-8 text-center text-sm text-muted-foreground">
            No services yet. Add some from the admin panel.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = resolveIcon(s.icon);
            return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group border-gradient relative overflow-hidden p-6 transition hover:shadow-[var(--shadow-glow-purple)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-primary)] opacity-0 transition group-hover:opacity-10" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:bg-[var(--gradient-primary)]">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
