export interface IProduct {
  title: string;
  author: string;
  price: number;
  category: "Fiction" | "Science" | "SelfDevelopement" | "Poetry" | "Religious";
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
