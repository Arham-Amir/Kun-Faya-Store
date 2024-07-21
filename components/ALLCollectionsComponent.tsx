import { getCollections } from "@/lib/actions/actions";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ALLCollectionsComponent = async () => {
  const collections = await getCollections();

  return (
    <div id="products">
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ALLCollectionsComponent;


function CollectionCard({ collection }: any) {
  return <div className="relative group/card overflow-hidden rounded-lg">
    <Image
      src={collection.image}
      alt={collection.title}
      width={350}
      height={200}
      className="rounded-lg cursor-pointer group-hover/card:opacity-70 transition-opacity duration-300"
    />
    <div className="absolute inset-0 bg-solid opacity-0 group-hover/card:opacity-50 transition-opacity duration-300"></div>
    <Link href={`/collections/${collection._id}`} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full group-hover/card:translate-y-1/2 group-hover/card:bottom-1/2 transition-all duration-500 bg-primary text-primary-foreground py-3 px-4 rounded-full opacity-0 group-hover/card:opacity-100 flex items-center group/button !min-w-fit">
      View Collection <span><ArrowRight className="group-hover/button:translate-x-1" /></span>
    </Link>
  </div>
}