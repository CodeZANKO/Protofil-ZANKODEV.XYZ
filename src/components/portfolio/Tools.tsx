import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useList } from "@/lib/cms";

interface DbTool {
  id: string;
  name: string;
  icon_slug: string | null;
  logo_url: string | null;
  color: string | null;
}

function toolIconUrl(t: DbTool) {
  if (t.logo_url) return t.logo_url;
  if (t.icon_slug) {
    const hex = (t.color ?? "").replace("#", "");
    return `https://cdn.simpleicons.org/${t.icon_slug}${hex ? `/${hex}` : ""}`;
  }
  return "";
}

function ToolCard({ tool, index }: { tool: DbTool; index: number }) {
  const iconUrl = toolIconUrl(tool);
  const color = tool.color ?? "#a78bfa";
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 12) * 0.04 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 rounded-2xl bg-[var(--gradient-primary)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-gradient" />
              <div className="relative m-[1px] rounded-2xl glass aspect-square flex flex-col items-center justify-center gap-2 p-4 transition-all duration-500 group-hover:shadow-[var(--shadow-glow-purple)]">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3 + (index % 4),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="grid h-10 w-10 place-items-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ color }}
                >
                  {iconUrl ? (
                    <img src={iconUrl} alt={tool.name} className="h-9 w-9 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-2xl font-bold">{tool.name.charAt(0)}</span>
                  )}
                </motion.div>
                <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {tool.name}
                </span>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}25, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="glass-strong border-accent/30">
          <p className="font-medium">{tool.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Tools() {
  const { data: tools = [], isLoading } = useList<DbTool>("tools");
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Stack"
          title="Tools & Technologies"
          subtitle="The toolkit I reach for to ship reliable, modern software."
        />

        {!isLoading && tools.length === 0 && (
          <div className="glass mx-auto mt-12 max-w-md rounded-2xl p-8 text-center text-sm text-muted-foreground">
            No tools yet. Add some from the admin panel.
          </div>
        )}

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5 lg:grid-cols-6">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>

      {tools.length > 0 && (
        <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-6">
            {[...tools, ...tools].map((t, i) => {
              const iconUrl = toolIconUrl(t);
              return (
                <div
                  key={i}
                  className="glass flex h-16 min-w-[170px] items-center justify-center gap-3 rounded-xl px-5 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow-cyan)]"
                >
                  {iconUrl && <img src={iconUrl} alt="" className="h-6 w-6 object-contain" loading="lazy" />}
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
