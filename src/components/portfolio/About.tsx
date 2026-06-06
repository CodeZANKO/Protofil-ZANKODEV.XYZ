import { motion } from "framer-motion";
import { Code2, Shield, Brain, Megaphone, Lightbulb, Rocket } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useContent } from "@/lib/cms";

interface AboutData {
  heading: string;
  subtitle: string;
  body: string;
  stats: { label: string; value: string }[];
}

const fallbackAbout: AboutData = {
  heading: "Building the future, one line of code",
  subtitle:
    "I'm a developer obsessed with technology, innovation, and creating digital experiences that feel alive.",
  body: "",
  stats: [],
};

const cards = [
  { icon: Code2, title: "Web Development", text: "Building fast, modern, scalable applications with cutting-edge stacks." },
  { icon: Brain, title: "AI & Automation", text: "Designing intelligent systems that automate workflows and unlock new value." },
  { icon: Shield, title: "Cybersecurity", text: "Hardening apps with secure architecture, threat modeling, and best practices." },
  { icon: Megaphone, title: "Digital Marketing", text: "Crafting campaigns and content that grow brands and convert audiences." },
  { icon: Lightbulb, title: "Problem Solving", text: "Turning complex challenges into elegant, ship-ready solutions." },
  { icon: Rocket, title: "Innovation First", text: "Always exploring emerging tech to deliver next-level products." },
];

export function About() {
  const { data } = useContent<AboutData>("about", fallbackAbout);
  const about = { ...fallbackAbout, ...(data ?? {}) };
  return (
    <section id="about" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="About Me"
          title={about.heading}
          subtitle={about.subtitle}
        />

        {about.body && (
          <p className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground whitespace-pre-line">
            {about.body}
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group glass relative overflow-hidden rounded-2xl p-6 transition hover:border-accent/50"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--gradient-primary)] opacity-0 blur-3xl transition group-hover:opacity-30" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow-purple)]">
                <c.icon size={22} className="text-white" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
