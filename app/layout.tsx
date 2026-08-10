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
  const imageUrl = `${origin}/og.png`;

  return {
    title: {
      default: "Shreyshth Sharma | Financial Research & Data Analytics",
      template: "%s | Shreyshth Sharma",
    },
    description:
      "Economics and Quantitative Methods graduate building defensible research, decision models, and analytical reporting across finance and business questions.",
    authors: [{ name: "Shreyshth Sharma", url: origin }],
    creator: "Shreyshth Sharma",
    keywords: [
      "Shreyshth Sharma",
      "financial research",
      "data analytics",
      "investment analytics",
      "econometrics",
      "Tableau",
      "Python",
    ],
    alternates: { canonical: origin },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Shreyshth Sharma — Analysis that holds up in the room",
      description: "Financial research × data analytics.",
      url: origin,
      siteName: "Shreyshth Sharma Portfolio",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1536,
          height: 1024,
          alt: "Shreyshth Sharma — Financial Research and Data Analytics",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shreyshth Sharma — Analysis that holds up in the room",
      description: "Financial research × data analytics.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
