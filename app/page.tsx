import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "CT Demo — The new standard in email-to-memo workflows",
  description:
    "Interactive demo for structured legal extraction, memo review, and PDF export.",
};

export default function Page() {
  return <LandingPage />;
}
