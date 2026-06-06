import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useContent } from "@/lib/cms";

interface AboutData {
  stats: { label: string; value: string }[];
}

interface HeroData {
  name: string;
  title: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  avatarUrl: string;
  badge?: string;
}

const fallback: HeroData = {
  name: "Zanko",
  title: "Developer · AI & Automation Specialist",
  tagline:
    "I craft premium digital experiences powered by AI, automation, and bullet-proof security.",
  ctaPrimary: "View Projects",
  ctaSecondary: "Contact Me",
  avatarUrl:
    "https://wvhcsbectcffcadbihgt.supabase.co/storage/v1/object/public/portfolio/zanko-avatar-new.png",
  badge: "Available for new projects",
};

function useTyping(phrases: string[]) {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[pi];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      const next = del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!del && next === current) setTimeout(() => setDel(true), 1500);
      else if (del && next === "") {
        setDel(false);
        setPi((pi + 1) % phrases.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, pi, phrases]);

  return text;
}

export function Hero() {
  const { data } = useContent<HeroData>("hero", fallback);
  const { data: about } = useContent<AboutData>("about", { stats: [] });
  const hero = { ...fallback, ...(data ?? {}) };
  const stats = about?.stats?.length
    ? about.stats
    : [
        { value: "50+", label: "Projects" },
        { value: "5+", label: "Years" },
        { value: "30+", label: "Clients" },
      ];
  const phrases = hero.title.split(/[·•|,/]+/).map((p) => p.trim()).filter(Boolean);
  const typed = useTyping(phrases.length ? phrases : [hero.title]);
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--gradient-radial)" }}
        aria-hidden
      />

      <div className="container relative mx-auto grid gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          >
            Hi, I'm <span className="text-gradient animate-gradient">{hero.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex h-10 items-center text-xl text-muted-foreground md:text-2xl"
          >
            <span className="text-foreground">{typed}</span>
            <span className="ml-1 inline-block h-6 w-[2px] bg-accent animate-blink" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-muted-foreground"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-medium text-white shadow-[var(--shadow-glow-purple)] transition hover:scale-105"
            >
              {hero.ctaPrimary}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium backdrop-blur transition hover:border-accent hover:bg-white/10"
            >
              <Mail size={18} /> {hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6"
          >
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="relative animate-float">
            <div className="absolute -inset-6 rounded-full bg-[var(--gradient-primary)] opacity-40 blur-3xl" />
            <div className="relative rounded-full p-1 bg-[var(--gradient-primary)] animate-pulse-glow">
              <div className="rounded-full bg-background p-2">
                <img
                  src={hero.avatarUrl || fallback.avatarUrl}
                  alt={`${hero.name} portrait`}
                  width={400}
                  height={400}
                  className="h-72 w-72 rounded-full object-cover md:h-96 md:w-96"
                />
              </div>
            </div>
            {/* Floating chips */}
            {[
              { t: "AI", c: "top-4 -left-6", d: 0 },
              { t: "</>", c: "top-1/2 -right-8", d: 0.5 },
              { t: "🛡", c: "-bottom-2 left-8", d: 1 },
            ].map((b) => (
              <motion.div
                key={b.t}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, delay: b.d, repeat: Infinity }}
                className={`glass absolute ${b.c} grid h-12 w-12 place-items-center rounded-xl text-lg font-bold shadow-[var(--shadow-glow-cyan)]`}
              >
                {b.t}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
