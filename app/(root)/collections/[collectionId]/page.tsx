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

  return (<div className="flex flex-col gap-10">
    <CollectionHeading
      title={collectionDetails.title}
      description={collectionDetails.description}
      image={collectionDetails.image}
    />

    <div id="products" className="py-10 px-4 md:px-10 flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-8 md:gap-16 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
          <AnimatedCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
