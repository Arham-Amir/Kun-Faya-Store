import Collections from "@/components/Collections";
import Hero from "@/components/Hero";
import HotProductList from "@/components/HotProductList";
import LatestP from "@/components/LatestP";
import Features from "@/components/Features";

import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <Hero />
      <Features />
      <Collections />

      <HotProductList />
      <LatestP />
      <Newsletter />
    </div>
  );
}

export const dynamic = "force-dynamic";
