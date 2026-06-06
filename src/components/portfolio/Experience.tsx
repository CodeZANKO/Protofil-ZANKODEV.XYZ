import { motion } from "framer-motion";
import { Code2, Shield, Brain, Megaphone } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  { year: "2020", title: "Web Development", icon: Code2, text: "Started crafting modern websites and learning the full stack from the ground up." },
  { year: "2022", title: "Cybersecurity Learning", icon: Shield, text: "Dove into ethical hacking, OWASP, and securing real-world applications." },
  { year: "2023", title: "AI Automation Projects", icon: Brain, text: "Began designing automation systems powered by LLMs and custom AI agents." },
  { year: "2024", title: "Marketing & Social Media", icon: Megaphone, text: "Expanded into digital marketing — combining tech and creative growth strategies." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Journey"
          title="My experience timeline"
          subtitle="A snapshot of the milestones that shaped the developer I am today."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-[2px] bg-[var(--gradient-primary)] md:left-1/2 md:-translate-x-1/2" />
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-12 grid items-center gap-4 md:grid-cols-2 ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                <span className="font-mono text-sm text-accent">{it.year}</span>
                <h3 className="mt-1 font-display text-2xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>
              </div>
              <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-background border-2 border-accent shadow-[var(--shadow-glow-cyan)]">
                  <it.icon size={16} className="text-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
