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
  farmerId: z.string().optional(),
  farmerName: z.string().min(2).optional(),
  deliveryTime: z.string().min(2).optional(),
  images: z.array(z.string().url()).min(1).optional(),
  tags: z.array(z.string().min(1)).max(6).optional(),
  description: z.string().min(20),
});

export const enquirySchema = z.object({
  type: z.enum(["sell", "bulk", "contact"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).max(13).optional().or(z.literal("")),
  company: z.string().optional(),
  subject: z.string().min(2).optional(),
  requirement: z.string().min(10),
});

export const createAuctionSchema = z.object({
  productName: z.string().min(2),
  description: z.string().min(20),
  quantity: z.string().min(1),
  basePrice: z.coerce.number().positive(),
  bidIncrement: z.coerce.number().positive(),
  auctionEndTime: z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "Auction end time must be a valid date and time.",
    }),
});

export const placeBidSchema = z.object({
  amount: z.number().positive(),
});

export const chatRequestSchema = z.object({
  sessionId: z.string().min(3),
  message: z.string().min(1).max(1000),
  pageContext: z
    .object({
      pathname: z.string().max(200).optional(),
      pageTitle: z.string().max(200).optional(),
      focusProduct: z.string().max(160).optional(),
      visibleProducts: z.array(z.string().max(160)).max(12).optional(),
    })
    .optional(),
});
