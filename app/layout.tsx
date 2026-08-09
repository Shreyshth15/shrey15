import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const imageUrl = `${origin}/og.jpg`;

  return {
    title: "Shrey15 — Financial Research & Data Analytics",
    description: "Decision-ready analysis across financial research, data analytics, and investment questions.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Shrey15 — Decision-Ready Analysis",
      description: "Financial research × data analytics.",
      url: origin,
      siteName: "Shrey15",
      images: [{ url: imageUrl, width: 1254, height: 1254, alt: "Shrey Sharma — Financial Research and Data Analytics" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shrey15 — Decision-Ready Analysis",
      description: "Financial research × data analytics.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
