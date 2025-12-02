"use server";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import Order from "@/lib/models/Order";

export const getCollections = async () => {
  try {
    await connectToDB();
    const collections = await Collection.find().sort({ createdAt: "desc" });
    return JSON.parse(JSON.stringify(collections));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export const getCollectionDetails = async (collectionId: string) => {
  try {
    await connectToDB();
    const collection = await Collection.findById(collectionId).populate("products");
    return JSON.parse(JSON.stringify(collection));
  } catch (error) {
    console.error('Error fetching collection details:', error);
    return null;
  }
}

export const getProducts = async () => {
  try {
    await connectToDB();
    const products = await Product.find().sort({ createdAt: "desc" });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const getLatestProducts = async (collectionId?: string) => {
  try {
    await connectToDB();

    let products;

    if (collectionId) {
      products = await Product.find({ collections: collectionId }).sort({ createdAt: "desc" });
    } else {
      products = await Product.find().sort({ createdAt: "desc" });
    }

    if (products.length > 0) {
      // Shuffle products randomly and return 8
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      return JSON.parse(JSON.stringify(shuffled.slice(0, 8)));
    }
    return [];
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
};

export const getTopProductsWithHeadline = async () => {
  try {
    await connectToDB();
    const products = await Product.find();
    if (products.length > 0) {
      // Shuffle products randomly and return 4
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      return JSON.parse(JSON.stringify(shuffled.slice(0, 4)));
    }
    return [];
  } catch (error) {
    console.error('Error fetching top products:', error);
    return [];
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    await connectToDB();
    const product = await Product.findById(productId);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

export const getSearchedProducts = async (query: string) => {
  try {
    await connectToDB();
    const searchedProducts = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } }
      ]
    });
    return JSON.parse(JSON.stringify(searchedProducts));
  } catch (error) {
    console.error('Error fetching searched products:', error);
    return [];
  }
}

export const getOrders = async (customerId: string) => {
  try {
    await connectToDB();
    const orders = await Order.find({ customerClerkId: customerId }).populate({
      path: "products.product",
      model: Product
    }).sort({ createdAt: "desc" });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export const getRelatedProducts = async (productId: string) => {
  try {
    await connectToDB();
    const product = await Product.findById(productId);
    if (!product) return [];

    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { collections: { $in: product.collections } }
      ],
      _id: { $ne: product._id } // Exclude current product
    }).limit(4);

    return JSON.parse(JSON.stringify(relatedProducts));
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}