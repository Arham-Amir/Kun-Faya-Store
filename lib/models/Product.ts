import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    media: [String],
    otherMedia: [String],
    category: String,
    headline: String,
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    tags: [String],
    price: { type: Number, get: (v: any) => Math.round(v) },
    cost: { type: Number, get: (v: any) => Math.round(v) },
    sizes: [String],
    colors: [String],
    sale: Number,
    stock: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true }, timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
