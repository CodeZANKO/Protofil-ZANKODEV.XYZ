import { createFileRoute } from "@tanstack/react-router";
import { ListManager } from "@/components/admin/ListManager";

export const Route = createFileRoute("/admin/skills")({ component: SkillsAdmin });

function SkillsAdmin() {
  return (
    <ListManager
      table="skills"
      title="Skills"
      description="Your technical abilities and proficiency."
      imageFolder="skills"
      fields={[
        { key: "name", label: "Name", placeholder: "React" },
        { key: "category", label: "Category", placeholder: "Frontend, Backend..." },
        { key: "percentage", label: "Proficiency (0-100)", type: "number" },
        { key: "logo_url", label: "Logo", type: "image" },
      ]}
    />
  );
}
