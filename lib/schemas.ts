import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  mobile: z.string().min(10).max(13),
  role: z.enum(["buyer", "farmer"]).default("buyer"),
});

export const orderSchema = z.object({
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).max(13),
  addressLine: z.string().min(6),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().length(6),
  paymentMode: z.enum(["COD", "UPI", "Razorpay", "Stripe"]),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .min(1),
  couponCode: z.string().optional(),
});

export const farmerProductSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  price: z.number().positive(),
  originalPrice: z.number().positive(),
  unit: z.string().min(1),
  state: z.string().min(2),
  stock: z.number().min(0),
  organic: z.boolean(),
  description: z.string().min(20),
});
