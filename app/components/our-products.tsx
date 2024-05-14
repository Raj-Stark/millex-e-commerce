import SectionHeader from "@/components/section-header";
import { Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "./product-card";

const OurProducts = () => {
  return (
    <Container maxWidth="xl">
      <SectionHeader
        sectionName={"Our Products"}
        sectionTitle={"Explore Our Products"}
        category={"scroll-btn"}
      />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
        <Grid item xs={3}>
          <ProductCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurProducts;
