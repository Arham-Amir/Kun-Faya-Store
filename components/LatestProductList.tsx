"use client"

import { useEffect, useState } from 'react';
import { getLatestProducts } from '@/lib/actions/actions'; // Adjust the path as needed
import ProductsSlider from './ProductsSlider';
import LoaderComp from './LoaderComp';

const LatestProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const latestProducts = await getLatestProducts();
        setProducts(latestProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-8 px-2 sm:px-5">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-heading2-bold sm:text-heading1-bold tracking-wide">Latest Products</h2>
        <p className="text-body-medium text-muted-foreground text-center">Discover our newest arrivals!</p>
      </div>
      {loading ? <LoaderComp />
        :
        products.length === 0 ? (
          <p className="text-body-bold">No products found</p>
        ) : (
          <ProductsSlider products={products} />
        )
      }
    </div>
  );
};

export default LatestProductList;
