import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CT Demo — Email Thread to File Note",
  description: "Interactive legal workflow demo with file note review and PDF export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
