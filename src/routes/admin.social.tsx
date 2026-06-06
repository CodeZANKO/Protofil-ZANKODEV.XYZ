import { createFileRoute } from "@tanstack/react-router";
import { ListManager } from "@/components/admin/ListManager";

export const Route = createFileRoute("/admin/social")({ component: SocialAdmin });

function SocialAdmin() {
  return (
    <ListManager
      table="social_links"
      title="Social Links"
      description="Where people can find you online."
      fields={[
        { key: "platform", label: "Platform", placeholder: "GitHub" },
        { key: "url", label: "URL", type: "url", placeholder: "https://..." },
        { key: "icon", label: "Icon name (lucide)", placeholder: "Github" },
      ]}
    />
  );
}
