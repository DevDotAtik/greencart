import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["buyer", "farmer", "admin"],
      default: "buyer",
      index: true,
    },
    avatar: String,
    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

export const UserModel = models.User || model("User", userSchema);
