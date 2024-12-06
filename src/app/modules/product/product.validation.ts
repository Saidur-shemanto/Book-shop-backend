import { z } from "zod";

export const productValidationSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),

  author: z.string({
    required_error: "Author is required",
  }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price must be a positive number"),
  category: z.enum(
    ["Fiction", "Science", "SelfDevelopement", "Poetry", "Religious"],
    {
      required_error: "Category is required",
      invalid_type_error:
        "Category must be one of Fiction, Science, SelfDevelopement, Poetry, or Religious",
    }
  ),
  description: z.string({
    required_error: "Description is required",
  }),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(0, "Quantity must be a non-negative number"),
  inStock: z.boolean({
    required_error: "In-stock status is required",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});
