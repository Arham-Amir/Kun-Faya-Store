"use client"

import { AnimatedCard } from "@/components/animatedCard"
import Loader from "@/components/Loader"
import { PageHeader } from "@/components/PageHeader"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
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
    <div className="flex flex-col gap-10 pb-10">
      <PageHeader title="Your Wishlist" description={wishlist.length === 0 ? "Your wishlist is empty" : `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved`} />

      <div className="container mx-auto px-4 md:px-10">
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
    </div>
  )
}

export const dynamic = "force-dynamic";
export default Wishlist