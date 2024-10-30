import { atomWithStorage } from "jotai/utils";

interface WishList {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  inventory: number;
  cartTotal: number;
  averageRating: number;
  numOfReviews: number;
}

export const wishListAtom = atomWithStorage<WishList[]>("wishlist", []);
