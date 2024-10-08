"use client";
import SectionHeader from "@/components/section-header";
import { Container, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ProductCard from "../components/product-card";

// Separate component for the content that uses useSearchParams
const CategoryPageContent = () => {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader sectionTitle={text ?? ""} sectionName="Item By Category" />

      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid item xs={3} key={index}>
            <ProductCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Main component with proper Suspense boundary
const CategoryPage = () => {
  return (
    <Suspense
      fallback={
        <Container maxWidth="xl" sx={{ my: 4 }}>
          <div>Loading...</div>
        </Container>
      }
    >
      <CategoryPageContent />
    </Suspense>
  );
};

export default CategoryPage;
