"use client"

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productInfo, productMedia }: { productInfo: ProductType, productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px] relative">
      {productInfo.headline != "" && <span className="absolute left-3 top-3 text-base-bold font-bold text-transparent min-w-fit z-10 gradient-text animate-gradient">{productInfo.headline}</span>}
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={200}
            width={200}
            alt="product"
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === image ? "border-2 border-black" : ""}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
