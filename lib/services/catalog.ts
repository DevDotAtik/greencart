import { connectToDatabase } from "@/lib/db";
import { categories, farmers, orders, products, reviewsByProduct, users } from "@/lib/mock-data";
import type { DemoUser, FarmerProfile, Order, Product } from "@/lib/types";

export type ProductFilters = {
  search?: string;
  category?: string;
  state?: string;
  organic?: string;
  rating?: string;
  sort?: string;
};

export async function getCategories() {
  return categories;
}

export async function getFarmers() {
  return farmers;
}

export async function getProducts(filters: ProductFilters = {}) {
  await connectToDatabase();

  let filtered = [...products];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        product.farmerName.toLowerCase().includes(query),
    );
  }

  if (filters.category) {
    filtered = filtered.filter((product) => product.category === filters.category);
  }

  if (filters.state) {
    filtered = filtered.filter((product) => product.state === filters.state);
  }

  if (filters.organic) {
    const organic = filters.organic === "true";
    filtered = filtered.filter((product) => product.organic === organic);
  }

  if (filters.rating) {
    filtered = filtered.filter((product) => product.rating >= Number(filters.rating));
  }

  switch (filters.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      filtered.sort((a, b) => Number(Boolean(b.trending)) - Number(Boolean(a.trending)));
      break;
  }

  return filtered;
}

export async function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export async function getTrendingProducts() {
  return products.filter((product) => product.trending);
}

export async function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export async function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export async function getRelatedProducts(product: Product) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.category === product.category || candidate.state === product.state),
    )
    .slice(0, 4);
}

export async function getProductReviews(productId: string) {
  return reviewsByProduct[productId] ?? [];
}

export async function searchSuggestions(query: string) {
  if (!query.trim()) {
    return [];
  }

  const lowered = query.toLowerCase();
  return products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(lowered) ||
        product.category.toLowerCase().includes(lowered) ||
        product.tags.some((tag) => tag.toLowerCase().includes(lowered)),
    )
    .slice(0, 6)
    .map((product) => ({
      id: product.id,
      slug: product.slug,
      label: product.name,
      category: product.category,
      farmerName: product.farmerName,
    }));
}

export async function getStates() {
  return Array.from(new Set(products.map((product) => product.state)));
}

export async function getUserByEmail(email: string): Promise<DemoUser | undefined> {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  return orders.filter((order) => order.userId === userId);
}

export async function getFarmerById(farmerId: string): Promise<FarmerProfile | undefined> {
  return farmers.find((farmer) => farmer.id === farmerId);
}

export async function getFarmerProducts(farmerId: string): Promise<Product[]> {
  return products.filter((product) => product.farmerId === farmerId);
}
