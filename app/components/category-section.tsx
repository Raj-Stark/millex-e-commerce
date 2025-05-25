import React from "react";
import axios from "axios";
import { Box, Container, SxProps, Theme } from "@mui/material";

import SectionHeader from "@/components/section-header";
import CategoryBox from "./category-box";
import { Category } from "@/types/category-types";

interface IProps {
  sx?: SxProps<Theme>;
}

async function getCategories(): Promise<Category[]> {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}categories`;
    const response = await axios.get<{ categories: Category[] }>(endpoint);
    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

const CategorySection = async (props: IProps) => {
  const sx = props.sx || {};
  const categories = await getCategories();

  return (
    <Container
      maxWidth="xl"
      sx={{ borderBottom: "1px solid", borderColor: "#D9D9D9", ...sx }}
    >
      <SectionHeader
        sectionName="Categories"
        sectionTitle="Browse By Category"
        category="scroll-btn"
      />

      <Box
        sx={{ display: "flex", overflowY: "auto" }}
        my={{ xs: "20px", sm: "40px" }}
        columnGap={{ xs: "10px", sm: "20px", md: "40px" }}
      >
        {categories.map((item) => (
          <CategoryBox
            key={item._id}
            text={item.name}
            imgUrl={item.image ?? ""}
            categoryId={item._id}
            slug={item.slug}
          />
        ))}
      </Box>
    </Container>
  );
};

export default CategorySection;
