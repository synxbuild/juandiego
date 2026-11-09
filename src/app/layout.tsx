import type { Metadata, Viewport } from "next";
import { Cinzel, Playfair_Display, Poppins } from "next/font/google";
import { MetaPixel } from "@/components/eventonline/ui/meta-pixel";
import "./globals.css";

// Root layout owns <html>, tracking and ALL font variables. Landings own their metadata.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Variable fonts: no weight list. Secondary fonts are not preloaded so they don't compete with the hero LCP.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lograbienesraicespr.com"),
  icons: { icon: "/images/logra-favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${playfair.variable} ${cinzel.variable} antialiased`}
    >
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
