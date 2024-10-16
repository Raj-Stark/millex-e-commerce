import ProductCard from "@/app/components/product-card";
import SectionHeader from "@/components/section-header";
import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import axios from "axios";

interface Category {
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  numOfReviews: number;
  averageRating: number;
  category: Category;
}

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

async function getProductsByCategory(categoryId: string): Promise<Product[]> {
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

  let data: Product[] = [];
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
    <Container maxWidth="xl" sx={{ my: 4, height: "100vh" }}>
      <SectionHeader
        sectionTitle={data![0]?.category.name ?? ""}
        sectionName="Item By Category"
      />

      <Grid container spacing={3}>
        {data?.length > 0 ? (
          data?.map((item) => (
            <Grid item xs={3} key={item._id}>
              <ProductCard
                reviewCount={item.numOfReviews}
                rating={item.averageRating ?? 1}
                title={item.name}
                image={item.image}
                price={item.price}
                id={item._id}
              />
            </Grid>
          ))
        ) : (
          <Typography ml={3} mt={10}>
            No Product found !!!
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
