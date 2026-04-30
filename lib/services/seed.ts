import { hash } from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { categories, farmers, products, users } from "@/lib/mock-data";
import { CategoryModel } from "@/models/Category";
import { FarmerModel } from "@/models/Farmer";
import { ProductModel } from "@/models/Product";
import { UserModel } from "@/models/User";

let seedPromise: Promise<void> | null = null;

async function seedMongoData() {
  await connectToDatabase();

  const [productCount, categoryCount, farmerCount, userCount] = await Promise.all([
    ProductModel.countDocuments(),
    CategoryModel.countDocuments(),
    FarmerModel.countDocuments(),
    UserModel.countDocuments(),
  ]);

  if (!categoryCount) {
    await CategoryModel.insertMany(categories, { ordered: false });
  }

  if (!farmerCount) {
    await FarmerModel.insertMany(farmers, { ordered: false });
  }

  if (!productCount) {
    await ProductModel.insertMany(
      products.map((product) => ({
        ...product,
        harvestDate: new Date(product.harvestDate),
      })),
      { ordered: false },
    );
  }

  if (!userCount) {
    const seededUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hash(user.password, 10),
      })),
    );

    await UserModel.insertMany(seededUsers, { ordered: false });
  }
}

export async function ensureSeedData() {
  if (!seedPromise) {
    seedPromise = seedMongoData().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }

  await seedPromise;
}
