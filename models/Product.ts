import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer", index: true },
    farmerName: { type: String, required: true },
    category: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    description: { type: String, required: true },
    tags: [String],
    unit: String,
    stock: { type: Number, default: 0, index: true },
    organic: { type: Boolean, default: false, index: true },
    price: { type: Number, required: true, index: true },
    originalPrice: { type: Number, required: true },
    deliveryTime: String,
    rating: { type: Number, default: 0, index: true },
    reviewCount: { type: Number, default: 0 },
    images: [String],
    harvestDate: Date,
    featured: { type: Boolean, default: false, index: true },
    trending: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

productSchema.index({ category: 1, price: 1, rating: -1 });

export const ProductModel = models.Product || model("Product", productSchema);
