import { getTopProductsWithHeadline } from "@/lib/actions/actions";
import ProductsSlider from "./ProductsSlider";


const HotProductList = async () => {
    const products: ProductType[] = await getTopProductsWithHeadline("Hot Selling");

    return (
        <div className="flex flex-col items-center gap-8 py-8 px-5">
            <div className="flex flex-col gap-4 items-center">
                <h2 className="text-heading2-bold sm:text-heading1-bold tracking-wide">Hot Sellings</h2>
                <p className="text-body-medium text-grey-2 text-center">Shop our top-rated, hot-selling products</p>
            </div>
            {!products || products.length === 0 ? (
                <p className="text-body-bold">No products found</p>
            ) : (
                <ProductsSlider products={products} />
            )}
        </div>
    );
};

export default HotProductList;