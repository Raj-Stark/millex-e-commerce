import { atomWithStorage } from "jotai/utils";
import { ProductType } from "@/types/product-types";

export const wishListAtom = atomWithStorage<ProductType[]>("wishlist", []);
