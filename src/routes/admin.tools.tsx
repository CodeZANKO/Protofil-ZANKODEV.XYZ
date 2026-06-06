import { createFileRoute } from "@tanstack/react-router";
import { ListManager } from "@/components/admin/ListManager";

export const Route = createFileRoute("/admin/tools")({ component: ToolsAdmin });

function ToolsAdmin() {
  return (
    <ListManager
      table="tools"
      title="Tools & Technologies"
      description="Tech stack you work with."
      imageFolder="tools"
      fields={[
        { key: "name", label: "Name", placeholder: "Python" },
        { key: "icon_slug", label: "Simple-icons slug", placeholder: "python" },
        { key: "logo_url", label: "Custom logo (optional)", type: "image" },
        { key: "color", label: "Brand color (hex)", placeholder: "#3776AB" },
      ]}
    />
  );
}
