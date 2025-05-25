import React from "react";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";

import SectionHeader from "@/components/section-header";
import { Category } from "@/types/category-types";
import CategoryBox from "@/app/components/category-box";

interface CategoryPageProps {
  params: {
    categorySlugs: string;
  };
}

async function getSubcategories(parentSlug: string): Promise<Category[]> {
  try {
    const response = await axios.get<{ categories: Category[] }>(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}categories/parent/${parentSlug}`,
    );
    return response.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categorySlugs } = params;

  let subcategories: Category[] = [];
  let error: string | null = null;

  try {
    subcategories = await getSubcategories(categorySlugs);
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Typography color="error" textAlign="center">
          Something went wrong: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4, minHeight: "100vh" }}>
      <SectionHeader
        sectionTitle={categorySlugs.replace(/-/g, " ").toUpperCase()}
        sectionName="Subcategories"
      />

      {subcategories.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          mt={4}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          {subcategories.map((subcategory) => (
            <CategoryBox
              key={subcategory._id}
              text={subcategory.name}
              imgUrl={subcategory.image ?? ""}
              categoryId={subcategory._id}
              slug={`${categorySlugs}/${subcategory.slug}`}
            />
          ))}
        </Box>
      ) : (
        <Typography mt={8} fontSize="20px" textAlign="center">
          No subcategories found for this category!
        </Typography>
      )}
    </Container>
  );
};

export default CategoryPage;
