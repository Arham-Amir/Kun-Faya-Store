"use client"

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productInfo, productMedia }: { productInfo: ProductType, productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-[400px] 2xl:max-w-[500px] relative">
      {productInfo.headline != "" && <span className="absolute left-3 top-3 text-base-bold font-bold text-transparent min-w-fit z-10 gradient-text animate-gradient">{productInfo.headline}</span>}
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-full h-auto rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-2 w-full overflow-x-scroll">
        {productMedia.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={200}
            width={200}
            alt="product"
            className={`min-w-20 max-w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === image ? "border-2 border-black" : ""}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
