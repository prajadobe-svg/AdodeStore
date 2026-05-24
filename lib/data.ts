export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

export const products: Product[] = [
  {
    slug: "aurora-headphones",
    name: "Aurora Headphones",
    category: "Audio",
    price: 199,
    description: "Wireless over-ear headphones with adaptive noise control.",
  },
  {
    slug: "pulse-watch",
    name: "Pulse Watch",
    category: "Wearables",
    price: 249,
    description: "A smart watch for health, fitness, and notifications.",
  },
  {
    slug: "nova-backpack",
    name: "Nova Backpack",
    category: "Lifestyle",
    price: 89,
    description: "Minimal laptop backpack built for daily commutes.",
  },
  {
    slug: "studio-speaker",
    name: "Studio Speaker",
    category: "Audio",
    price: 159,
    description: "Compact speaker with rich sound for home offices.",
  },
];