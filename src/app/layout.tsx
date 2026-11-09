import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { MetaPixel } from "@/features/analytics/meta-pixel";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOGRA | Masterclass gratuita de bienes raíces en Puerto Rico",
  description:
    "Masterclass gratuita en vivo con Juan Diego Gómez Sisco: el sistema para encontrar, financiar, remodelar y vender propiedades abandonadas en Puerto Rico.",
  icons: { icon: "/images/logra-favicon.png" },
  openGraph: {
    title: "LOGRA | Masterclass gratuita de bienes raíces en Puerto Rico",
    description:
      "El sistema para encontrar, financiar, remodelar y vender propiedades abandonadas en Puerto Rico. Online y en vivo.",
    images: ["/images/logra-desarrollo.jpeg"],
    locale: "es_PR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${hanken.variable} ${plexMono.variable} antialiased`}
    >
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
