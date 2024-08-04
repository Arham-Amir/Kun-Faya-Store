import { AnimatedCard } from "./animatedCard";

export default function ProductCards({ products }: { products: ProductType[] }) {
    return <div className='grid grid-cols-2 lg:grid-cols-4 custom-grid gap-2 sm:gap-6 lg-gap-4 2xl:gap-8 2xl:grid-cols-6'>
        {products.map((product, i) => (
            <AnimatedCard key={i} product={product} />
        ))}
    </div>
}