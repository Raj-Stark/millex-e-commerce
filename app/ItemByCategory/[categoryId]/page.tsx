import ProductCard from "@/app/components/product-card";
import SectionHeader from "@/components/section-header";
import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { ProductType } from "@/types/product-types";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

async function getProductsByCategory(
  categoryId: string
): Promise<ProductType[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/category/${categoryId}`
    );
    return response.data.products;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = params;

  let data: ProductType[] = [];
  let error: string | null = null;

  try {
    data = await getProductsByCategory(categoryId);
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  if (error) {
    return <Typography>Something went wrong !!!</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4, minHeight: "100vh" }}>
      <SectionHeader
        sectionTitle={data[0]?.category.name ?? ""}
        sectionName="Item By Category"
      />

      <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        {data?.length > 0 ? (
          data?.map((product) => (
            <Grid item xs={1} key={product._id}>
              <ProductCard
                id={product._id}
                title={product.name}
                image={product.images[0]}
                price={product.price}
                inventory={product.inventory}
                averageRating={product.averageRating}
                numOfReviews={product.numOfReviews}
              />
            </Grid>
          ))
        ) : (
          <Typography mt={16} fontSize={"24px"} textAlign={"center"}>
            No Product found for this category !!!
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
