import { motion } from "framer-motion";
import { useState } from "react";
import * as Icons from "lucide-react";
import { Send, Mail, Link as LinkIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useContent, useList } from "@/lib/cms";

interface ContactInfo {
  email: string;
  phone: string;
  telegram: string;
  location: string;
}
interface DbSocial {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
}

const contactFallback: ContactInfo = { email: "hello@example.com", phone: "", telegram: "", location: "" };

function resolveIcon(name: string | null) {
  if (!name) return LinkIcon;
  const I = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name];
  return I ?? LinkIcon;
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const { data: info } = useContent<ContactInfo>("contact", contactFallback);
  const contact = { ...contactFallback, ...(info ?? {}) };
  const { data: socials = [] } = useList<DbSocial>("social_links");

  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          subtitle="Have a project in mind, a collaboration, or just want to say hi? Drop me a message."
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gradient-primary)] shadow-[var(--shadow-glow-purple)]">
                <Mail size={18} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold">Email</h3>
              <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-accent">
                {contact.email}
              </a>
              {contact.phone && <div className="mt-2 text-sm text-muted-foreground">{contact.phone}</div>}
              {contact.telegram && <div className="text-sm text-muted-foreground">{contact.telegram}</div>}
              {contact.location && <div className="text-sm text-muted-foreground">{contact.location}</div>}
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">Follow me</h3>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Icon = resolveIcon(s.icon);
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.platform}
                      className="glass grid h-11 w-11 place-items-center rounded-xl transition hover:scale-110 hover:border-accent hover:shadow-[var(--shadow-glow-cyan)]"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
                {socials.length === 0 && (
                  <span className="text-xs text-muted-foreground">Add social links in the admin panel.</span>
                )}
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
            }}
            className="glass space-y-4 rounded-2xl p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-accent focus:shadow-[var(--shadow-glow-cyan)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-accent focus:shadow-[var(--shadow-glow-cyan)]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                maxLength={1000}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-accent focus:shadow-[var(--shadow-glow-cyan)]"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-medium text-white shadow-[var(--shadow-glow-purple)] transition hover:scale-[1.02]"
            >
              {sent ? (
                "Message Sent ✓"
              ) : (
                <>
                  Send Message <Send size={16} className="transition group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
