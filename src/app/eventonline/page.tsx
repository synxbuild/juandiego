import { Header } from "@/components/eventonline/sections/header";
import { Hero } from "@/components/eventonline/sections/hero";
import { Statement } from "@/components/eventonline/sections/statement";
import { Results } from "@/components/eventonline/sections/results";
import { Learn } from "@/components/eventonline/sections/learn";
import { Pillars } from "@/components/eventonline/sections/pillars";
import { Presenter } from "@/components/eventonline/sections/presenter";
import { Company } from "@/components/eventonline/sections/company";
import { Transformation } from "@/components/eventonline/sections/transformation";
import { Closing } from "@/components/eventonline/sections/closing";
import { Footer } from "@/components/eventonline/sections/footer";
import { MobileCta } from "@/components/eventonline/sections/mobile-cta";
import { Motion } from "@/components/eventonline/ui/motion";

export default function EventOnlinePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Results />
        <Learn />
        <Pillars />
        <Presenter />
        <Company />
        <Transformation />
        <Closing />
      </main>
      <Footer />
      <MobileCta />
      {/* Inside the page (not the layout) so it runs after the page tree has hydrated. */}
      <Motion />
    </>
  );
}
