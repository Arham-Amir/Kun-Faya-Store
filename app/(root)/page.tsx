import Collections from "@/components/Collections";
import Hero from "@/components/Hero";
import HotProductList from "@/components/HotProductList";
import LatestProductList from "@/components/LatestProductList";
import SaleBanner from "@/components/SaleBanner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Collections />
      <LatestProductList />
      <SaleBanner />
      <HotProductList />
    </div>
  );
}

export const dynamic = "force-dynamic";

