"use client";

import { useEffect, useState } from 'react';
import { getCollections, getLatestProducts } from '@/lib/actions/actions'; // Adjust the path as needed
import ProductsSlider from './ProductsSlider';
import LoaderComp from './LoaderComp';

const CollectionsLatestProduct = () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const fetchedCollections = await getCollections();
        setCollections(fetchedCollections);
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return loading ? (
    <LoaderComp />
  ) : (
    <div className="flex flex-col items-center justify-center gap-8 w-full py-8 px-2 sm:px-5">
      {collections.map((collection: CollectionType) => (
        <LatestProductList key={collection._id} collection={collection} />
      ))}
    </div>
  );
};

const LatestProductList = ({ collection }: { collection: CollectionType }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const latestProducts = await getLatestProducts(collection._id);
        setProducts(latestProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collection._id]); // Correctly re-run the effect when the collection changes

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-heading2-bold sm:text-heading1-bold tracking-wide text-center whitespace-break-spaces">{collection.title}</h2>
        <p className="text-body-medium text-muted-foreground text-center whitespace-break-spaces">
          Discover our newest arrivals in {collection.title}!
        </p>
      </div>
      {loading ? (
        <LoaderComp />
      ) : products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <ProductsSlider products={products} />
      )}
    </div>
  );
};

export default CollectionsLatestProduct;
