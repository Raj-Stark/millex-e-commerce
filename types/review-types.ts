import { UserId } from "./user-types";

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: UserId;
  productId: string;
  createdAt: string;
  updatedAt: string;
}
