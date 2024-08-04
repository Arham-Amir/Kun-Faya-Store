import Collections from "@/components/Collections";
import Hero from "@/components/Hero";
import HotProductList from "@/components/HotProductList";
import LatestP from "@/components/LatestP";
import CollectionsLatestProduct from "@/components/CollectionsLatestProduct";
import SaleBanner from "@/components/SaleBanner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <LatestP />
      <Collections />
      <CollectionsLatestProduct />
      <SaleBanner />
      <HotProductList />
    </div>
  );
}

export const dynamic = "force-dynamic";

