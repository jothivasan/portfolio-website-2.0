import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string, socialDescription = description): Metadata {
  const image = { url: "/og.png", width: 1200, height: 630, alt: "Jothivasan, Full Stack Developer. I build digital products that work beautifully." };
  return {
    title,
    description,
    alternates: { canonical: path, types: { "application/rss+xml": "https://blogs.jothivasan.dev/rss.xml" } },
    openGraph: { type: "website", siteName: "Jothivasan", url: path, title, description: socialDescription, images: [image] },
    twitter: { card: "summary_large_image", title, description: socialDescription, images: [image] },
  };
}
