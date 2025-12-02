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
            {product.sale != 0 && <p className="text-xs absolute right-4 top-4 bg-primary text-primary-foreground rounded-md py-[2px] px-2 min-w-fit z-10 font-bold shadow-sm">Save Rs. {Math.floor(((product.price * 100) / (100 - product.sale)) - product.price)}</p>}
            <CardBody className="bg-card relative group/card hover:shadow-lg hover:shadow-primary/20 dark:border-white/[0.2] border-black/[0.1] w-full sm:w-64 h-auto rounded-xl p-4 border transition-all duration-300">
                <div className="relative">
                    <Link href={`/products/${product._id}`}>
                        <CardItem translateZ="100" className="w-full">
                            <Image
                                src={product.media[0]}
                                height="1000"
                                width="1000"
                                className="h-52 w-full object-cover rounded-lg group-hover/card:scale-105 transition-all duration-300 shadow-md"
                                alt="thumbnail"
                            />
                        </CardItem>
                    </Link>
                    <CardItem translateZ={20} as="div" className="absolute top-2 left-2 z-20">
                        <div className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm hover:bg-white transition-colors">
                            <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
                        </div>
                    </CardItem>
                </div>

                <Link href={`/products/${product._id}`} className="flex flex-col gap-3 mt-4">
                    {product.headline != "" && <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 w-fit">{product.headline}</p>}

                    <CardItem
                        translateZ="50"
                        className="text-lg font-bold text-foreground line-clamp-1"
                    >
                        {product.title}
                    </CardItem>

                    <CardItem translateZ="40" className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">(45)</span>
                    </CardItem>

                    <div className="flex justify-between items-center mt-2">
                        <CardItem
                            translateZ={20}
                            as='div'
                            className="text-lg font-bold"
                        >
                            {product.sale ? (
                                <div className="flex flex-col items-start">
                                    <span className="text-primary">Rs. {Math.floor(product.price)}</span>
                                    <div className="flex gap-2 items-center text-xs">
                                        <span className="line-through text-muted-foreground">Rs. {Math.floor((product.price * 100) / (100 - product.sale))}</span>
                                        <span className="text-green-600 font-bold">{product.sale}% OFF</span>
                                    </div>
                                </div>
                            ) : (
                                <span>Rs. {Math.floor(product.price)}</span>
                            )}
                        </CardItem>
                    </div>
                </Link>
            </CardBody>
        </CardContainer >
    );
}
