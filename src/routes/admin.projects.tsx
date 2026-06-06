import { createFileRoute } from "@tanstack/react-router";
import { ListManager } from "@/components/admin/ListManager";

export const Route = createFileRoute("/admin/projects")({ component: ProjectsAdmin });

function ProjectsAdmin() {
  return (
    <ListManager
      table="projects"
      title="Projects"
      description="Showcase your work."
      imageFolder="projects"
      fields={[
        { key: "title", label: "Title", placeholder: "Project name" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "category", label: "Category", placeholder: "Web, AI, Mobile..." },
        { key: "thumbnail_url", label: "Thumbnail", type: "image" },
        { key: "demo_url", label: "Demo URL", type: "url" },
        { key: "github_url", label: "GitHub URL", type: "url" },
        { key: "technologies", label: "Technologies (comma-separated)", type: "csv" },
      ]}
    />
  );
}
