import { Category } from "./category-types";

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
  numOfReviews: number;
  averageRating: number;
  category: Category;
  inventory: number;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  createdAt: string;
  updatedAt: string;
}
