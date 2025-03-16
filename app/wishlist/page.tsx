"use client";
import { wishListAtom } from "@/commonAtoms/wishListAtom";
import SectionHeader from "@/components/section-header";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useAtomValue } from "jotai";

import React from "react";
import ProductCard from "../components/product-card";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "@/types/product-types";
import ProductCardSkeleton from "../components/product-card-shimmer";
import axios from "axios";

const RenderWishList: React.FC<{ wishlist: ProductType[] }> = (props) => {
  const wishlist = props.wishlist;
  return wishlist.length > 0 ? (
    wishlist?.map((product) => (
      <Grid item xs={1} key={product._id}>
        <ProductCard product={product} />
      </Grid>
    ))
  ) : (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography mt={16} fontSize={"24px"} textAlign={"center"}>
        No Product in the Wishlist
      </Typography>
    </Box>
  );
};

const WishListPage = () => {
  const wishlist = useAtomValue(wishListAtom);
  // const {
  //   data: wishlist,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["wishlist"],
  //   queryFn: async () => {
  //     const url = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/wishlist/list`;
  //     const response = await axios<{ wishlist: ProductType[] }>(url, {
  //       withCredentials: true,
  //     });
  //     if (response.status !== 200) {
  //       throw new Error("Something went wrong !!!");
  //     }
  //     return response.data.wishlist;
  //   },
  // });

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box mt={6}>
        <SectionHeader sectionName="Wishlist" />
      </Box>

      <Grid
        sx={{ marginBottom: "50px" }}
        container
        spacing={{ xs: 2, sm: 4 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        <RenderWishList wishlist={wishlist ?? []} />
      </Grid>
    </Container>
  );
};

export default WishListPage;
