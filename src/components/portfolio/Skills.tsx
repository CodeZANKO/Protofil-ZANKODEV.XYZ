import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { useList } from "@/lib/cms";

interface DbSkill {
  id: string;
  name: string;
  percentage: number;
  logo_url: string | null;
  category: string | null;
}

export function Skills() {
  const { data: skills = [], isLoading } = useList<DbSkill>("skills");
  return (
    <section id="skills" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Skills"
          title="My technical toolkit"
          subtitle="A blend of engineering, design, and growth disciplines refined through years of shipping."
        />
        {!isLoading && skills.length === 0 && (
          <div className="glass mx-auto max-w-md rounded-2xl p-8 text-center text-sm text-muted-foreground">
            No skills yet. Add some from the admin panel.
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass group rounded-xl p-5 transition hover:border-accent/50 hover:shadow-[var(--shadow-glow-cyan)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  {s.logo_url && <img src={s.logo_url} alt="" className="h-5 w-5 object-contain" />}
                  {s.name}
                </span>
                <span className="text-sm text-accent font-mono">{s.percentage}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
                  className="h-full rounded-full bg-[var(--gradient-primary)] shadow-[0_0_12px_oklch(0.7_0.24_260_/_0.6)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
