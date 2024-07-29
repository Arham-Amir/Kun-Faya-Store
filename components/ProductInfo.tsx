"use client";

import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { AlertTriangle, MinusCircle, PlusCircle } from "lucide-react";

import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      {productInfo.sale != 0 && <p className="text-sm bg-primary text-primary-foreground rounded-md py-1 px-2 w-fit z-10">Save Rs. {Math.floor(productInfo.price * productInfo.sale / 100)}</p>}
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}
        </p>
        <HeartFavorite product={productInfo} />
      </div>
      <div className="flex gap-2">
        <p className="text-base-medium text-muted-foreground">Category:</p>
        <p className="text-base-bold">{productInfo.category}
        </p>
      </div>

      <p className="text-heading3-bold">Rs.{productInfo.price}</p>
      {productInfo.sale != 0 &&
        <p className="text-base-bold">
          <span className="strikethrough max-w-fit text-foreground">{productInfo.price}</span>
          <span className="text-foreground"> | </span>
          <span className="text-primary">{productInfo.sale}% OFF</span>
        </p>
      }

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-muted-foreground">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-muted-foreground">Colors:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedColor === color && "bg-card text-card-foreground"
                  }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-muted-foreground">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedSize === size && "bg-card text-card-foreground"
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-muted-foreground">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-primary cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-primary cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>
      {productInfo.stock < 1 && <p className="text-amber-600 flex items-center"><AlertTriangle className="inline mr-1" /> Out of Stock</p>}
      <button
        className={`outline text-base-bold py-3 rounded-lg ${productInfo.stock > 0 && "hover:bg-primary hover:text-foreground"}`}
        disabled={productInfo.stock < 1}
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
