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

  return (<section className="flex flex-col gap-10">
    <CollectionHeading title={collectionDetails.title} description={collectionDetails.description} />
    <div className="px-10 py-5 flex flex-col items-center gap-8 relative">
      <div className="flex flex-wrap gap-16 justify-center">
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

