import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
};

function normalizeAppUrl(value?: string): string {
  const raw = (value || "").trim();
  if (!raw) return "https://x-rayv2.vercel.app";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/+$/, "");
  }
  return `https://${raw.replace(/\/+$/, "")}`;
}

const APP_URL = normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL);

const frameMetadata = {
  version: "next",
  imageUrl: `${APP_URL}/cover.png`,
  button: {
    title: "Open XRAY \u2620\ufe0f",
    action: {
      type: "launch_frame",
      name: "XRAY",
      url: `${APP_URL}/?miniApp=true`,
      splashImageUrl: `${APP_URL}/s.png`,
      splashBackgroundColor: "#010101",
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: "XRAY Protocol",
  description: "XRAY analyzes behavioral patterns and generates your onchain genome through wallet exposure.",
  openGraph: {
    title: "XRAY Protocol",
    description: "What happens when you expose your wallet? XRAY generates your onchain genome.",
    url: APP_URL,
    siteName: "XRAY",
    images: [
      {
        url: `${APP_URL}/cover.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  other: {
    "fc:frame": JSON.stringify(frameMetadata),
    "base:app_id": "69afa5a2aa54829902b4d9b9",
    "talentapp:project_verification": "74a5ed1d70937bf0560b586d994d6d9b8b5272db59c160da99179f84b56dc08fff6a9cf53ab48b19660f81660b43e7d454004f2ccc0bbaf06f1bc76c46cd01da",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className="font-sans bg-black text-white antialiased overflow-x-hidden min-h-[100dvh]">
        <Providers>
          <main className="min-h-[100dvh] w-full flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
