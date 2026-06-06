import { createFileRoute } from "@tanstack/react-router";
import { ListManager } from "@/components/admin/ListManager";

export const Route = createFileRoute("/admin/services")({ component: ServicesAdmin });

function ServicesAdmin() {
  return (
    <ListManager
      table="services"
      title="Services"
      description="What you offer to clients."
      fields={[
        { key: "title", label: "Title", placeholder: "Web Development" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "icon", label: "Icon name (lucide)", placeholder: "Code2" },
      ]}
    />
  );
}
