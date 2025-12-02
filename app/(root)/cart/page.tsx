"use client"

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
    <div className="container mx-auto px-4 md:px-10 py-10">
      <div className="flex gap-8 lg:gap-20 max-lg:flex-col">
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Shopping Cart</h1>
          <hr className="my-6" />

          {cart.cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">Your cart is empty</p>
              <p className="text-gray-400 mt-2">Add some items to get started!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.cartItems.map((cartItem) => (
                <div key={cartItem.item._id} className="w-full flex max-sm:flex-col max-sm:gap-3 bg-card rounded-xl px-6 py-4 items-center max-sm:items-start justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <Image
                      src={cartItem.item.media[0]}
                      width={100}
                      height={100}
                      className="rounded-lg w-24 h-24 object-cover"
                      alt="product"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-lg">{cartItem.item.title}</p>
                      {cartItem.color && (
                        <p className="text-sm text-gray-500">Color: {cartItem.color}</p>
                      )}
                      {cartItem.size && (
                        <p className="text-sm text-gray-500">Size: {cartItem.size}</p>
                      )}
                      <p className="font-semibold text-primary">Rs. {cartItem.item.price}</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-center">
                    <div className="flex gap-3 items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                      <MinusCircle
                        className="hover:text-primary cursor-pointer transition-colors"
                        onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                      />
                      <p className="font-bold min-w-[20px] text-center">{cartItem.quantity}</p>
                      <PlusCircle
                        className="hover:text-primary cursor-pointer transition-colors"
                        onClick={() => cart.increaseQuantity(cartItem.item._id)}
                      />
                    </div>

                    <Trash
                      className="hover:text-red-500 cursor-pointer transition-colors"
                      onClick={() => cart.removeItem(cartItem.item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <RightSummaryBox />
      </div>
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
    <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-card rounded-xl px-6 py-6 shadow-lg h-fit sticky top-24">
      <h2 className="text-2xl font-bold pb-2">
        Order Summary{" "}
        <span className="text-gray-500 text-base">{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
      </h2>

      <div className="flex flex-col gap-3">
        {cart.cartItems.map((cartItem) => (
          <div key={cartItem.item._id} className="flex justify-between text-sm">
            <span className="text-gray-600">{cartItem.quantity}x {cartItem.item.title}</span>
            <span className="font-semibold">Rs. {cartItem.item.price * cartItem.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm pt-2 border-t">
          <span className="text-gray-600"><Truck size={16} className="inline mr-1 text-red-800" />Delivery</span>
          <span className="font-semibold">Rs. {deliveryCharges}</span>
        </div>
      </div>

      <hr />

      <div className="flex justify-between text-lg font-bold">
        <span>Total Amount</span>
        <span className="text-primary">Rs. {totalRounded}</span>
      </div>

      {proceed ? <ShoppingCartForm cartItems={cart.cartItems} totalAmount={totalRounded} /> : (
        <button
          className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
          <input className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none" type="email" {...register('email')} />
          {errors.email && <p className="text-xs text-red-500"><AlertCircleIcon size={12} className="inline mr-1" />{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
            <input className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none" type="text" {...register('firstName')} />
            {errors.firstName && <p className="text-xs text-red-500"><AlertCircleIcon size={12} className="inline mr-1" />{errors.firstName.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
            <input className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none" type="text" {...register('lastName')} />
            {errors.lastName && <p className="text-xs text-red-500"><AlertCircleIcon size={12} className="inline mr-1" />{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Phone <span className="text-red-500">*</span></label>
          <input className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none" type="text" {...register('phone')} />
          {errors.phone && <p className="text-xs text-red-500"><AlertCircleIcon size={12} className="inline mr-1" />{errors.phone.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Complete Address <span className="text-red-500">*</span></label>
          <textarea rows={3} className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" {...register('completeAddress')} />
          {errors.completeAddress && <p className="text-xs text-red-500"><AlertCircleIcon size={12} className="inline mr-1" />{errors.completeAddress.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">City <span className="text-red-500">*</span></label>
            <input className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none" type="text" {...register('city')} />
            {errors.city && <p className="text-xs text-red-500"><AlertCircleIcon size={12} className="inline mr-1" />{errors.city.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Postal Code</label>
            <input className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none" type="text" {...register('postalCode')} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Nearest Famous Place</label>
          <input className="p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none" type="text" {...register('nearestFamousPlace')} />
        </div>

        <button className="w-full mt-4 py-3 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-all duration-300" type="submit">Confirm Order</button>
      </form>
    </div>
  );
};
