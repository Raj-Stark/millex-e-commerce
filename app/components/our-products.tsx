import SectionHeader from "@/components/section-header";
import {
  Container,
  Grid,
  Box,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";
import ProductCard from "./product-card";
import axios from "axios";
import { ProductType } from "@/types/product-types";

interface IProps {
  sx?: SxProps<Theme>;
}

async function getFeaturedProducts(): Promise<ProductType[]> {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product`;
    const response = await axios.get<{ products: ProductType[] }>(endpoint);
    return response.data.products.filter((p) => p.featured);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const OurProducts = async (props: IProps) => {
  const sx = props.sx || {};
  const featuredProducts = await getFeaturedProducts();

  if (featuredProducts.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          ...sx,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No featured products available.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={sx}>
      <SectionHeader
        sectionName="Our Products"
        sectionTitle="Explore Our Products"
        category="scroll-btn"
      />
      <Grid
        container
        spacing={{ xs: 2, sm: 4 }}
        sx={{ marginTop: "20px !important" }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {featuredProducts.map((product) => (
          <Grid item xs={1} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OurProducts;
