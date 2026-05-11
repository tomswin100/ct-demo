import type { Metadata } from "next";
import { WorkflowShell } from "../../components/WorkflowShell";

export const metadata: Metadata = {
  title: "Workflow demo — CT Demo",
  description:
    "Review email threads, run extraction, and export a partner-facing legal summary.",
};

export default function DemoPage() {
  return <WorkflowShell />;
}
