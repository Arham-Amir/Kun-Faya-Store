"use client";

import { ChevronsLeft, ChevronsRight, Star } from "lucide-react";
import { AnimatedCard } from "./animatedCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductsSlider = ({ products }: { products: ProductType[] }) => {
    return (
        <div className="w-full relative p-5">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={products.length > 1 ? true : false}
                style={{
                    height: 'auto',
                    width: '100%',
                    maxWidth: '100%',
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    nextEl: ".button-next-slide",
                    prevEl: ".button-prev-slide",
                }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                    800: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        loop: products.length > 2 ? true : false,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        loop: products.length > 3 ? true : false,
                    },
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        loop: products.length > 4 ? true : false,
                    }
                }}
                className="mySwiper relative !pb-5"
            >
                {products.map((product: ProductType) => (
                    <SwiperSlide key={product._id} style={{ width: 'auto', marginBottom: 'auto', padding: '10px 0' }}>
                        <AnimatedCard product={product} />
                    </SwiperSlide>
                ))}
                <div className='button-next-slide absolute top-1/2 right-1 transform -translate-y-1/2 z-10 cursor-pointer bg-black p-2 rounded-full'>
                    <ChevronsRight className='text-2xl text-white' />
                </div>
                <div className='button-prev-slide absolute top-1/2 left-1 transform -translate-y-1/2 z-10 cursor-pointer bg-black p-2 rounded-full'>
                    <ChevronsLeft className='text-2xl text-white' />
                </div>
            </Swiper>
        </div>
    )
}

export default ProductsSlider



// import Image from "next/image";
// import Link from "next/link";
// import HeartFavorite from "./HeartFavorite";

// interface ProductCardProps {
//   product: ProductType;
//   updateSignedInUser?: (updatedUser: UserType) => void;
// }

// const ProductCard = ({ product, updateSignedInUser }: ProductCardProps ) => {
//   return (
//     <Link
//       href={`/products/${product._id}`}
//       className="w-[220px] flex flex-col gap-2"
//     >
//       <Image
//         src={product.media[product.media.length-1]}
//         alt="product"
//         width={250}
//         height={300}
//         className="h-[250px] rounded-lg object-cover"
//       />
//       <div>
//         <p className="text-base-bold">{product.title}</p>
//         <p className="text-small-medium text-muted-foreground">{product.category}</p>
//       </div>
//       <div className="flex justify-between items-center">
//         <p className="text-body-bold">Rs.{product.price}</p>
//         <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;
