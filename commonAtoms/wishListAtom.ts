import axios from "axios";
import { atomWithStorage } from "jotai/utils";
import { ProductType } from "@/types/product-types";

export const wishListAtom = atomWithStorage<ProductType[]>("wishlist", []);

export const fetchWishlist = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/wishlist/list`;

    const response = await axios<{ wishlist: ProductType[] }>(url, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Something went wrong while fetching the wishlist.");
    }
    return response.data.wishlist;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    return [];
  }
};
