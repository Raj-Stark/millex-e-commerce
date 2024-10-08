"use client";
import SectionHeader from "@/components/section-header";
import { Container, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProductCard from "../components/product-card";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const text = searchParams.get("text"); // Extract the 'text' query parameter

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader sectionTitle={text ?? ""} sectionName="Item By Category" />

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

export default CategoryPage;
