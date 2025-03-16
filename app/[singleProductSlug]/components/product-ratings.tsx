"use client";
import appTheme from "@/config/theme";
import { useMediaQuery, Rating } from "@mui/material";
import React from "react";

const ProductRatings = ({ rating }: { rating: number }) => {
  const matchesSMBreakpoint = useMediaQuery(appTheme.breakpoints.up("sm"));
  return (
    <Rating
      size={matchesSMBreakpoint ? "medium" : "small"}
      name="half-rating"
      readOnly
      defaultValue={rating}
      precision={0.5}
    />
  );
};

export default ProductRatings;
