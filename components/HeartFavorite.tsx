"use client"

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface HeartFavoriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.wishlist.includes(product._id));
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (err) {
      console.log("[users_GET]", err);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple clicks while loading

    try {
      if (!user) {
        router.push("/sign-in");
        return;
      }

      setLoading(true);
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setIsLiked(updatedUser.wishlist.includes(product._id));
        updateSignedInUser && updateSignedInUser(updatedUser);
        toast.success("Wishlist updated");
      } else {
        throw new Error("Failed to update wishlist");
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
      toast.error("Failed to update wishlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      <Heart className={`hover:text-red-500 ${isLiked ? "fill-red-500 text-red-500" : "fill-white text-gray-400"}`} />
    </button>
  );
};

export default HeartFavorite;
