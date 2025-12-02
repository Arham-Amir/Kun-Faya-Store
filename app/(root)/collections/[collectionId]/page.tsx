import { AnimatedCard } from "@/components/animatedCard";
import { CollectionHeading } from "@/components/collection/CollectionHeading";
import { getCollectionDetails } from "@/lib/actions/actions";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  return (<section className="flex flex-col gap-10 py-10 px-4 md:px-10">
    <div className="flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        {collectionDetails.title}
      </h1>
      <p className="text-lg md:text-xl text-gray-500">
        {collectionDetails.description}
      </p>
    </div>

    <div id="products" className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-8 md:gap-16 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
          <AnimatedCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  </section>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
