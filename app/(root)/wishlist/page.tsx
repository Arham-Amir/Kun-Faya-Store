"use client"

import { AnimatedCard } from "@/components/animatedCard"
import Loader from "@/components/Loader"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

const Wishlist = () => {
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [wishlist, setWishlist] = useState<ProductType[]>([])

  const getUser = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setSignedInUser(data)
      setLoading(false)
    } catch (err) {
      console.log("[users_GET", err)
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  const getWishlistProducts = async () => {
    setLoading(true)

    if (!signedInUser) return

    const wishlistProducts = await Promise.all(signedInUser.wishlist.map(async (productId) => {
      const res = await getProductDetails(productId)
      return res
    }))

    setWishlist(wishlistProducts)
    setLoading(false)
  }

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }


  return loading ? <Loader /> : (
    <div className="container mx-auto px-4 md:px-10 py-10">
      <div className="flex flex-col items-center gap-6 mb-10">
        <div className="flex items-center gap-3">
          <Heart className="w-10 h-10 text-primary" fill="currentColor" />
          <h1 className="text-4xl md:text-5xl font-bold">Your Wishlist</h1>
        </div>
        <p className="text-lg text-gray-500">
          {wishlist.length === 0 ? "Your wishlist is empty" : `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved`}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">Start adding products you love!</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {wishlist.map((product) => (
            <AnimatedCard key={product._id} product={product} updateSignedInUser={updateSignedInUser} />
          ))}
        </div>
      )}
    </div>
  )
}

export const dynamic = "force-dynamic";
export default Wishlist