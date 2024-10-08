export const getCollections = async () => {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
  return await collections.json()
}

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`)
  return await collection.json()
}

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  return await products.json()
}

export const getLatestProducts = async (id: string = "") => {
  if (id == "") {
    const latestProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/latest`);
    return await latestProducts.json();
  }
  else{
    const latestProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/latest?collectionId=${encodeURIComponent(id)}`);
    return await latestProducts.json();
  }
};

export const getTopProductsWithHeadline = async (headline: string) => {
  const topProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/topWithHeadline?headline=${encodeURIComponent(headline)}`);
  return await topProducts.json();
};


export const getProductDetails = async (productId: string) => {
  const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
  return await product.json()
}

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`)
  return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
  const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`)
  return await orders.json()
}

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`)
  return await relatedProducts.json()
}