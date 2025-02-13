"use client";
import { userAtom } from "@/commonAtoms/userAtom";
import { fetchWishlist, wishListAtom } from "@/commonAtoms/wishListAtom";
import { useAtomValue, useSetAtom } from "jotai";
import React, { ReactNode, useEffect } from "react";

export const GlobalStateInitializer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const setWishlist = useSetAtom(wishListAtom);
  const user = useAtomValue(userAtom);
  async function fetchAndSetWishlist() {
    const wishlist = await fetchWishlist();
    setWishlist(wishlist);
  }
  useEffect(() => {
    if (user.isLoggedIn) {
      fetchAndSetWishlist();
    }
  }, [user.isLoggedIn]);
  return children;
};
