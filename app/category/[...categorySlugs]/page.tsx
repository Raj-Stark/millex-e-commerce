import ProductCard from "@/app/components/product-card";
import SectionHeader from "@/components/section-header";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { ProductType } from "@/types/product-types";
import { Category } from "@/types/category-types";
import { SubCategoryLink } from "./SubCategoryLink";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    categorySlugs: string[];
  };
}

interface Response {
  products: ProductType[];
  count: number;
  subcategories: Category[];
}

async function getProductsByCategory(
  categorySlugs: string[],
): Promise<Response> {
  try {
    const response = await axios.post<Response>(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/filter`,
      {
        categorySlugs,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        products: [],
        count: 0,
        subcategories: [],
      };
    }
    throw error;
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categorySlugs } = params;
  let products: ProductType[] = [];
  let subcategories: Category[] = [];
  let count: number;
  let error: string | null = null;

  try {
    let response = await getProductsByCategory(categorySlugs);
    products = response.products;
    count = response.count;
    subcategories = response.subcategories;
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  if (error) {
    return <Typography>Something went wrong !!!</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4, minHeight: "100vh" }}>
      <SectionHeader
        sectionTitle={products[0]?.category.name ?? ""}
        sectionName="Item By Category"
      />

      <Box display="flex">
        {subcategories?.length > 0 && (
          <Box
            sx={{
              width: "300px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Sizes
            </Typography>
            <ul>
              {subcategories.map((subcategory) => {
                return (
                  <li key={subcategory.slug}>
                    <SubCategoryLink category={subcategory} />
                  </li>
                );
              })}
            </ul>
          </Box>
        )}
        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          {products?.length > 0 ? (
            products?.map((product) => (
              <Grid item xs={1} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography mt={16} fontSize={"24px"} textAlign={"center"}>
              No Product found for this category !!!
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CategoryPage;
