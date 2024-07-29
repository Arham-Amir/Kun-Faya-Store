"use client"

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-primary">Order Placed Successfully</p>
      <p className="text-center">Thank you for your shopping. You will receive a call from one of our customer care representatives to confirm your order.</p>
      <Link
        href="/"
        className="p-4 border text-base-bold bg-black hover:bg-primary text-white"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
