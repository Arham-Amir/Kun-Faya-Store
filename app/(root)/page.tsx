import Collections from "@/components/Collections";
import Hero from "@/components/Hero";
import HotProductList from "@/components/HotProductList";
import LatestProductList from "@/components/LatestProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-black">
      <Hero />
      <Collections />
      <LatestProductList />
      <HotProductList />
    </div>
  );
}

export const dynamic = "force-dynamic";

