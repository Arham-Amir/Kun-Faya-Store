import { AnimatedCard } from "./animatedCard";

export default function ProductCards({ products }: { products: ProductType[] }) {
    return <div className='flex flex-wrap justify-center gap-8 w-full'>
        {products.map((product, i) => (
            <AnimatedCard key={i} product={product} />
        ))}
    </div>
}