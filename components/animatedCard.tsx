"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from './ui3dCard';
import Link from "next/link";
import { Star } from "lucide-react";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
    product: ProductType;
    updateSignedInUser?: (updatedUser: UserType) => void;
}
export function AnimatedCard({ product, updateSignedInUser }: ProductCardProps) {
    return (
        <CardContainer className="inter-var relative">
            {product.headline != "" && <p className="text-sm font-bold text-transparent absolute left-2 top-2 p-1 min-w-fit z-10 gradient-text animate-gradient">{product.headline}</p>}
            {product.sale != 0 && <p className="text-sm absolute right-2 top-2 bg-red-1 text-white rounded-md py-1 px-2 min-w-fit z-10">Save Rs. {Math.floor( product.price * product.sale / 100)}</p>}
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border text-black">
                <Link
                    href={`/products/${product._id}`}
                >
                    <CardItem
                        translateZ="50"
                        className="mt-4 text-xl font-bold text-black dark:text-white"
                    >
                        {product.title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {product.category}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                            src={product.media[product.media.length - 1]}
                            height="1000"
                            width="1000"
                            className="h-60 w-full object-fill rounded-xl group-hover/card:scale-110 transition-all duration-400 group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                    {/* <CardItem translateZ="50" className="w-full mt-4">
                        <div className="space-x-1 flex justify-center">
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="white" className="text-orange-600" />
                        </div>
                    </CardItem> */}
                    <div className="flex justify-between items-center mt-10">
                        <CardItem
                            translateZ={20}
                            as='div'
                            className="px-4 py-2 rounded-xl text-lg font-bold text-black dark:text-white flex flex-col"
                        >
                            {product.sale ? (
                                <>
                                    <p>Rs. {Math.floor(product.price - product.price * product.sale / 100)}</p>
                                    <p className="text-small-medium">
                                        <span className="strikethrough max-w-fit text-black">{product.price}</span>
                                        <span className="text-black"> | </span>
                                        <span className="text-red-1 text-small-bold">{product.sale}% OFF</span>
                                    </p>
                                </>
                            ) : (
                                <>Rs. {Math.floor(product.price)}</>
                            )}
                        </CardItem>
                        <CardItem
                            translateZ={20}
                            as="div"
                            className="p-1 rounded-xl"
                        >
                            <HeartFavorite product={product} />
                            {/* Add To Cart */}
                        </CardItem>
                    </div>
                </Link>
            </CardBody>
        </CardContainer >
    );
}
