import { Schema, model, models } from "mongoose";

const farmerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    farmName: { type: String, required: true },
    state: { type: String, required: true, index: true },
    district: { type: String, required: true },
    rating: { type: Number, default: 0, index: true },
    verified: { type: Boolean, default: false, index: true },
    yearsActive: Number,
    speciality: [String],
    responseTime: String,
  },
  { timestamps: true },
);

export const FarmerModel = models.Farmer || model("Farmer", farmerSchema);
