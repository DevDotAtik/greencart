import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    subtotal: Number,
    deliveryCharge: Number,
    discount: Number,
    total: { type: Number, index: true },
    paymentMode: String,
    status: {
      type: String,
      enum: ["Processing", "Packed", "In Transit", "Delivered", "Cancelled"],
      default: "Processing",
      index: true,
    },
    placedAt: { type: Date, index: true },
    estimatedDelivery: Date,
    address: {
      label: String,
      recipient: String,
      line1: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
  },
  { timestamps: true },
);

export const OrderModel = models.Order || model("Order", orderSchema);
