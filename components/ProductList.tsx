import { getProducts } from "@/lib/actions/actions";
import { ShoppingCart, Star, StarIcon } from "lucide-react";
import { AnimatedCard } from "./animatedCard";
// import ProductCard from "./ProductCard";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {products.map((product: ProductType) => (
            <AnimatedCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;


function ProductCard({ product }: any) {
  return <section className="relative w-[250px] bg-purple-200 rounded-2xl text-center transform duration-500 hover:-translate-y-2 cursor-pointer border border-grey-2">
    <p className="text-xs absolute left-2 top-2 p-1 min-w-fit">Hot Seller</p>
    <p className="text-xs absolute right-2 top-2 bg-red-1 text-white rounded-full p-1 min-w-fit">60% off</p>
    <img className="h-[250px] rounded-2xl object-cover" src={product.media[product.media.length - 1]} alt="product_image" />
    <div className="p-5 flex flex-col gap-3">
      <div className="space-x-1 flex justify-center">
        <Star size={15} fill="orange" className="text-orange-600" />
        <Star size={15} fill="orange" className="text-orange-600" />
        <Star size={15} fill="orange" className="text-orange-600" />
        <Star size={15} fill="orange" className="text-orange-600" />
        <Star size={15} fill="white" className="text-orange-600" />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="whitespace-break-spaces text-lg font-bold">{product.title}</h1>
        <p className="whitespace-break-spaces">{product.category}</p>
      </div>
      <h2 className="whitespace-break-spaces font-semibold">Rs.{product.price}</h2>
      <button className="p-2 px-6 bg-red-1 text-white rounded-md">
        Add To Cart
      </button>
    </div>
  </section>
}