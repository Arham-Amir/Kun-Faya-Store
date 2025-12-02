import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerClerkId: String,
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            color: String,
            size: String,
            quantity: Number,
        },
    ],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    shippingRate: String,
    totalAmount: Number,
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
