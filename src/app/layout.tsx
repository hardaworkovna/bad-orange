import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Figma families: "Special Gothic Expanded One" (display) and "Host Grotesk" (text).
   Self-hosted from public/fonts (Google Fonts, OFL) so the app has no runtime font dependency. */
const specialGothic = localFont({
  src: "../../public/fonts/special-gothic-expanded-one.woff2",
  weight: "400",
  variable: "--font-special-gothic",
  display: "swap",
});

const hostGrotesk = localFont({
  src: [
    { path: "../../public/fonts/host-grotesk.woff2", weight: "300 800", style: "normal" },
    { path: "../../public/fonts/host-grotesk-italic.woff2", weight: "300 800", style: "italic" },
  ],
  variable: "--font-host-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daddy Sounds",
  description: "Audio stories. Be bad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${specialGothic.variable} ${hostGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
