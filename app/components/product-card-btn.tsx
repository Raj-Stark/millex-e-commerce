"use client";

import { userAtom } from "@/commonAtoms/userAtom";
import { triggerLogin } from "@/utils/triggerLogin";
import { Button, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import React from "react";

const ProductCardBtn = () => {
  const user = useAtomValue(userAtom);
  return (
    <Button
      sx={{ color: "#fff" }}
      onClick={() => {
        triggerLogin(user.isLoggedIn);
      }}
    >
      <Typography variant="h6" fontWeight={"500"} textTransform={"capitalize"}>
        Add To Cart
      </Typography>
    </Button>
  );
};

export default ProductCardBtn;
