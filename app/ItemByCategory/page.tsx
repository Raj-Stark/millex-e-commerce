"use client";
import SectionHeader from "@/components/section-header";
import { Container, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ProductCard from "../components/product-card";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <SectionHeader
          sectionTitle={text ?? ""}
          sectionName="Item By Category"
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
    </Suspense>
  );
};

export default CategoryPage;
