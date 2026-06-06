import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, Sparkles, Wrench, Cpu, Share2, ArrowUpRight } from "lucide-react";
import { useList } from "@/lib/cms";
import { PageShell } from "@/components/admin/PageShell";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function StatCard({
  to,
  label,
  count,
  icon: Icon,
  delay,
}: {
  to: string;
  label: string;
  count: number | string;
  icon: typeof Briefcase;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link
        to={to}
        className="glass group block rounded-2xl p-6 transition hover:border-accent/50 hover:shadow-[var(--shadow-glow-purple)]"
      >
        <div className="flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow-purple)]">
            <Icon className="text-white" size={18} />
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground transition group-hover:text-accent" />
        </div>
        <div className="mt-4 font-display text-3xl font-bold text-gradient">{count}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </Link>
    </motion.div>
  );
}

function Dashboard() {
  const skills = useList<{ id: string }>("skills");
  const projects = useList<{ id: string }>("projects");
  const services = useList<{ id: string }>("services");
  const tools = useList<{ id: string }>("tools");
  const social = useList<{ id: string }>("social_links");

  return (
    <PageShell title="Dashboard" description="Manage every section of your portfolio in one place.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard to="/admin/projects" label="Projects" count={projects.data?.length ?? "—"} icon={Briefcase} delay={0} />
        <StatCard to="/admin/skills" label="Skills" count={skills.data?.length ?? "—"} icon={Sparkles} delay={0.05} />
        <StatCard to="/admin/services" label="Services" count={services.data?.length ?? "—"} icon={Wrench} delay={0.1} />
        <StatCard to="/admin/tools" label="Tools" count={tools.data?.length ?? "—"} icon={Cpu} delay={0.15} />
        <StatCard to="/admin/social" label="Social Links" count={social.data?.length ?? "—"} icon={Share2} delay={0.2} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass mt-8 rounded-2xl p-6"
      >
        <h2 className="mb-4 font-display text-lg font-semibold">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { to: "/admin/hero", label: "Edit Hero" },
            { to: "/admin/about", label: "Edit About" },
            { to: "/admin/projects", label: "New Project" },
            { to: "/admin/seo", label: "Update SEO" },
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-accent hover:bg-white/10"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
