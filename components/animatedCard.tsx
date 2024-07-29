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
            {product.sale != 0 && <p className="text-xs absolute right-2 top-2 bg-primary text-primary-foreground rounded-md py-1 px-2 min-w-fit z-10">Save Rs. {Math.floor( product.price * product.sale / 100)}</p>}
            <CardBody className="bg-card relative group/card  hover:shadow-sm hover:shadow-primary dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-md p-6 border">
                <Link
                    href={`/products/${product._id}`}
                >
                    <CardItem
                        translateZ="50"
                        className="mt-4 text-xl font-bold text-foreground"
                    >
                        {product.title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-sm max-w-sm mt-2 text-muted-foreground"
                    >
                        {product.category}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                            src={product.media[product.media.length - 1]}
                            height="1000"
                            width="1000"
                            className="h-60 w-72 object-fill rounded-xl group-hover/card:scale-110 transition-all duration-400 group-hover/card:shadow-xl"
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
                            className="px-4 py-2 rounded-xl text-lg font-bold flex flex-col font-serif"
                        >
                            {product.sale ? (
                                <>
                                    <p>Rs. {Math.floor(product.price - product.price * product.sale / 100)}</p>
                                    <p className="text-small-medium">
                                        <span className="strikethrough before:border-solid max-w-fit text-foreground">{product.price}</span>
                                        <span className="text-foreground"> | </span>
                                        <span className="text-primary text-small-bold">{product.sale}% OFF</span>
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
