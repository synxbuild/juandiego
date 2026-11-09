import type { Metadata } from "next";
import { RegistrationProvider } from "@/components/eventonline/ui/registration-dialog";
import "./eventonline.css";

export const metadata: Metadata = {
  title: "LOGRA | Masterclass gratuita de bienes raíces en Puerto Rico",
  description:
    "Masterclass gratuita en vivo con Juan Diego Gómez Sisco: el sistema para encontrar, financiar, remodelar y vender propiedades abandonadas en Puerto Rico.",
  openGraph: {
    title: "LOGRA | Masterclass gratuita de bienes raíces en Puerto Rico",
    description:
      "El sistema para encontrar, financiar, remodelar y vender propiedades abandonadas en Puerto Rico. Online y en vivo.",
    images: ["/images/logra-desarrollo.jpeg"],
    locale: "es_PR",
    type: "website",
  },
};

export default function EventOnlineLayout({ children }: LayoutProps<"/eventonline">) {
  return (
    <div className="eo-scope min-h-svh">
      <RegistrationProvider>{children}</RegistrationProvider>
    </div>
  );
}
