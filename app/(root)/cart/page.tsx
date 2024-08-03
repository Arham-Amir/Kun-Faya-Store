"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { AlertCircleIcon, MinusCircle, PlusCircle, Star, Trash, Truck } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";

const Cart = () => {
  const cart = useCart();

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div className="flex flex-col gap-2">
            {cart.cartItems.map((cartItem) => (
              <div key={cartItem.item._id} className="w-full flex max-sm:flex-col max-sm:gap-3 bg-card rounded-lg px-4 py-3 items-center max-sm:items-start justify-between">
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">Rs. {cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-primary cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-primary cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-primary cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <RightSummaryBox />
    </div>
  );
};

export default Cart;

const RightSummaryBox: React.FC = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter()

  const [proceed, setProceed] = useState(false);
  const cart = useCart();
  const deliveryCharges = 180;

  let total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  if (total !== 0) total += deliveryCharges;
  const totalRounded = parseFloat(total.toFixed(2));

  const handleProceed = () => {
    if (!user) {
      toast("Login First.");
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?redirect_url=${redirectUrl}`);
      return;
    }
    if (cart.cartItems.length === 0) {
      toast("Please add items first.");
    } else {
      setProceed(prev => !prev);
    }
  };

  return (
    <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-card rounded-lg px-4 py-5">
      <p className="text-heading4-bold pb-4">
        Summary{" "}
        <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
      </p>
      <div className="flex flex-col gap-4">
        {cart.cartItems.map((cartItem) => (
          <div key={cartItem.item._id} className="flex justify-between text-small-medium">
            <span>{cartItem.quantity}x {cartItem.item.title}</span>
            <span>Rs. {cartItem.item.price * cartItem.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between text-small-medium">
          <span><Truck size={15} className="inline mr-1 text-red-800" />Delivery</span>
          <span>Rs. {deliveryCharges}</span>
        </div>
      </div>
      <hr />
      <div className="flex justify-between text-body-semibold">
        <span>Total Amount</span>
        <span>Rs. {totalRounded}</span>
      </div>
      {proceed ? <ShoppingCartForm cartItems={cart.cartItems} totalAmount={totalRounded} /> : (
        <button
          className="border rounded-lg text-body-bold text-white py-3 w-full bg-primary hover:bg-primary/80"
          onClick={handleProceed}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  completeAddress: z.string().min(1, 'Complete address is required'),
  nearestFamousPlace: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().optional(),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits" }),
});

type FormData = z.infer<typeof schema>;

const ShoppingCartForm: React.FC<{ cartItems: any[], totalAmount: number }> = ({ cartItems, totalAmount }) => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const toastid = toast.loading("Order processing...");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerDetails: {
            clerkId: user?.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
          products: cartItems.map((item) => { return { 'color': item.color, 'size': item.size, 'quantity': item.quantity, product: item.item.id } }),
          shippingAddress: {
            completeAddress: data.completeAddress,
            nearestFamousPlace: data.nearestFamousPlace,
            city: data.city,
            postalCode: data.postalCode,
            phone: data.phone,
          },
          shippingRate: 180,
          totalAmount: totalAmount,
        }),
      });

      const result = await res.json();
      toast.dismiss(toastid);
      if (res.ok) {
        toast.success("Order placed successfully!");
        router.push("/payment_success")
      } else {
        toast.error(result.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Error submitting order. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-foreground relative">Email <span className="text-red-800">*</span></label>
          <input className="p-2 bg-background max-w-lg" type="email" {...register('email')} />
          {errors.email && <p className="text-xs text-red-800"><AlertCircleIcon size={15} className="inline mr-1" />{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-foreground">Phone <span className="text-red-800">*</span></label>
          <input className="p-2 bg-background" type="text" {...register('phone')} />
          {errors.phone && <p className="text-xs text-red-800"><AlertCircleIcon size={15} className="inline mr-1" />{errors.phone.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-foreground">First Name <span className="text-red-800">*</span></label>
          <input className="p-2 bg-background" type="text" {...register('firstName')} />
          {errors.firstName && <p className="text-xs text-red-800"><AlertCircleIcon size={15} className="inline mr-1" />{errors.firstName.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-foreground">Last Name <span className="text-red-800">*</span></label>
          <input className="p-2 bg-background" type="text" {...register('lastName')} />
          {errors.lastName && <p className="text-xs text-red-800"><AlertCircleIcon size={15} className="inline mr-1" />{errors.lastName.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-foreground">Complete Address <span className="text-red-800">*</span></label>
          <textarea rows={5} className="p-2 bg-background max-w-lg" {...register('completeAddress')} />
          {errors.completeAddress && <p className="text-xs text-red-800"><AlertCircleIcon size={15} className="inline mr-1" />{errors.completeAddress.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-foreground">Nearest Famous Place</label>
          <input className="p-2 bg-background" type="text" {...register('nearestFamousPlace')} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-foreground">City <span className="text-red-800">*</span></label>
          <input className="p-2 bg-background" type="text" {...register('city')} />
          {errors.city && <p className="text-xs text-red-800"><AlertCircleIcon size={15} className="inline mr-1" />{errors.city.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-foreground">Postal Code</label>
          <input className="p-2 bg-background" type="text" {...register('postalCode')} />
        </div>
        <button className="btn bg-primary hover:bg-primary/80 text-white border-2 border-white" type="submit">Confirm Order</button>
      </form>
    </div>
  );
};
