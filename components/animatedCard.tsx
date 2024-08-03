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
            {product.sale != 0 && <p className="text-xs absolute right-2 top-2 bg-primary text-primary-foreground rounded-md py-1 px-2 min-w-fit z-10">Save Rs. {Math.floor(((product.price * 100) / (100 - product.sale)) - product.price)}</p>}
            <CardBody className="bg-card relative group/card  hover:shadow-sm hover:shadow-primary dark:border-white/[0.2] border-black/[0.1] w-64 sm:w-56 h-auto rounded-md p-6
            pb-3 border">
                <Link
                    href={`/products/${product._id}`}
                >
                    <CardItem
                        translateZ="50"
                        className="mt-4 text-base-bold font-bold text-foreground whitespace-break-spaces"
                    >
                        {product.title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-sm max-w-sm text-muted-foreground"
                    >
                        {product.category}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-2">
                        <Image
                            src={product.media[0]}
                            height="1000"
                            width="1000"
                            className="h-44 sm:h-40 w-full object-fill rounded-xl group-hover/card:scale-110 transition-all duration-400 group-hover/card:shadow-xl"
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
                    <div className="flex justify-between items-center mt-3">
                        <CardItem
                            translateZ={20}
                            as='div'
                            className="p-2 rounded-xl text-lg font-bold flex flex-col font-serif"
                        >
                            {product.sale ? (
                                <>
                                    <p>Rs. {Math.floor(product.price)}</p>
                                    <p className="text-small-medium">
                                        <span className="strikethrough before:border-solid max-w-fit text-foreground text-small-bold">{Math.floor((product.price * 100) / (100 - product.sale))}</span>
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
