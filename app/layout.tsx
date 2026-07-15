import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "SignalCV — Resume Builder for Software Engineers",
  description: "Build an ATS-ready software engineering resume, tailor it to a job description, and export it to PDF or DOCX.",
  icons: {
    icon: `${siteUrl}/favicon.svg`,
    shortcut: `${siteUrl}/favicon.svg`,
  },
  openGraph: {
    title: "SignalCV — Resume Builder for Software Engineers",
    description: "Build a resume that earns the interview.",
    type: "website",
    url: siteUrl,
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "SignalCV resume builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SignalCV — Resume Builder for Software Engineers",
    description: "Build a resume that earns the interview.",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
