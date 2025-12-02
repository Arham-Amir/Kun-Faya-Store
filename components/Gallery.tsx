"use client"

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productInfo, productMedia }: { productInfo: ProductType, productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[500px]">
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-lg group">
        {productInfo.headline != "" && (
          <span className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary z-10 shadow-sm">
            {productInfo.headline}
          </span>
        )}
        <Image
          src={mainImage}
          fill
          alt={productInfo.title}
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out cursor-zoom-in"
        />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {productMedia.map((image, index) => (
          <div
            key={index}
            className={`relative min-w-[80px] w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 snap-start ${mainImage === image
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-gray-300"
              }`}
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image}
              fill
              alt={`Product view ${index + 1}`}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
