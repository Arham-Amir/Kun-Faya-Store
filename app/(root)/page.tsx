import Collections from "@/components/Collections";
import HotProductList from "@/components/HotProductList";
import LatestProductList from "@/components/LatestProductList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={100} className="w-screen aspect-auto object-fill" />
      <Collections />
      <LatestProductList />
      <HotProductList />
    </>
  );
}

export const dynamic = "force-dynamic";

