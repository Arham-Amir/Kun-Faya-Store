"use client"

import { getTopProductsWithHeadline } from "@/lib/actions/actions";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductsSlider from "./ProductsSlider";


const HotProductList = async () => {
    const products: ProductType[] = await getTopProductsWithHeadline("Hot Selling");

    return (
        <div className="flex flex-col items-center gap-2 py-8 px-5">
            <p className="text-heading1-bold">Hot Sellings Products</p>
            {!products || products.length === 0 ? (
                <p className="text-body-bold">No products found</p>
            ) : (
                <ProductsSlider products={products} />
            )}
        </div>
    );
};

export default HotProductList;