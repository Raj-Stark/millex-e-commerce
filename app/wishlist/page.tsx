"use client";
import { wishListAtom } from "@/commonAtoms/wishListAtom";
import SectionHeader from "@/components/section-header";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useAtomValue } from "jotai";

import React from "react";
import ProductCard from "../components/product-card";

const WishListPage = () => {
  const wishlist = useAtomValue(wishListAtom);
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

      <Grid sx={{marginBottom: "50px"}} container spacing={{ xs: 2, sm: 4 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        {wishlist?.length > 0 ? (
          wishlist?.map((product) => (
            <Grid item xs={1} key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                inventory={product.inventory}
                averageRating={product.averageRating}
                numOfReviews={product.numOfReviews}
              />
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
        )}
      </Grid>
    </Container>
  );
}

export default WishListPage;
