import { AnimatedCard } from "@/components/animatedCard"
import Gallery from "@/components/Gallery"
import ProductInfo from "@/components/ProductInfo"
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions"
import Image from "next/image"

const ProductDetails = async ({ params }: { params: { productId: string } }) => {
  const productDetails: ProductType = await getProductDetails(params.productId)
  const relatedProducts = await getRelatedProducts(params.productId)

  let mediaMerged: string[] = productDetails.media
  if (productDetails.otherMedia && productDetails.otherMedia.length) {
    mediaMerged = [...mediaMerged, ...productDetails.otherMedia]
  }

  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productInfo={productDetails} productMedia={mediaMerged} />
        <ProductInfo productInfo={productDetails} />
      </div>
      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        {
          mediaMerged.map((media, i) => {
            return <MediaComponent key={i} media={media} />
          })
        }
      </div>
      {relatedProducts.length != 0 &&
        <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
          <p className="text-heading3-bold">Related Products</p>
          <div className="flex justify-center items-center flex-wrap gap-16 mx-auto mt-8">
            {relatedProducts?.map((product: ProductType) => (
              <AnimatedCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      }
    </>
  )
}

export const dynamic = "force-dynamic";

export default ProductDetails


function MediaComponent({ media }: { media: string }) {
  const isVideo = (media: string) => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm'];
    return videoExtensions.some(extension => media.includes(extension));
  };
  return isVideo(media) ? (
    <video controls className="max-w-full h-auto">
      <source src={media} type="video/mp4" />
    </video>
  ) : (
    <Image src={media} alt="Media content" width={800} height={600} className="max-w-full h-auto shadow-xl border" />
  );
}