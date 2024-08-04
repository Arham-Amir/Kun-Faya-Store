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
        <CardContainer className="inter-var relative max-w-full">
            {/* {product.headline != "" && <p className="text-sm font-bold text-transparent absolute left-4 top-3 p-1 min-w-fit z-10 gradient-text animate-gradient">{product.headline}</p>} */}
            {product.sale != 0 && <p className="text-xs absolute right-4 top-4 bg-primary text-primary-foreground rounded-md py-[2px] px-2 min-w-fit z-10">Save Rs. {Math.floor(((product.price * 100) / (100 - product.sale)) - product.price)}</p>}
            <CardBody className="bg-card relative group/card hover:shadow-sm hover:shadow-primary dark:border-white/[0.2] border-black/[0.1] w-56 h-auto rounded-md p-3
            pb-3 border">
                <Link
                    href={`/products/${product._id}`}
                >
                    <CardItem translateZ="100" className="w-full">
                        <Image
                            src={product.media[0]}
                            height="1000"
                            width="1000"
                            className="h-44 sm:h-40 w-full object-fill rounded-md group-hover/card:scale-110 transition-all duration-400 shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                    {product.headline != "" && <p className="text-sm font-bold text-transparent p-1 mx-auto mt-4 max-w-fit z-10 gradient-text animate-gradient">{product.headline}</p>}
                    <CardItem
                        translateZ="50"
                        className="mx-auto mt-1 text-base-bold font-bold text-foreground text-center whitespace-break-spaces"
                    >
                        {product.title}
                    </CardItem>
                    {/* <CardItem
                        as="p"
                        translateZ="60"
                        className="text-sm max-w-sm text-muted-foreground"
                    >
                        {product.category}
                    </CardItem> */}
                    {/* <CardItem translateZ="50" className="w-full mt-4">
                        <div className="space-x-1 flex justify-center">
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="orange" className="text-orange-600" />
                            <Star size={15} fill="white" className="text-orange-600" />
                        </div>
                    </CardItem> */}

                    <div className="flex justify-center items-center">
                        <CardItem
                            translateZ={20}
                            as='div'
                            className="p-2 rounded-xl text-lg font-bold flex flex-col items-center font-serif"
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
                        {/* <CardItem
                            translateZ={20}
                            as="div"
                            className="p-1 rounded-xl"
                        >
                            <HeartFavorite product={product} />
                        </CardItem> */}
                    </div>
                </Link>
            </CardBody>
        </CardContainer >
    );
}
