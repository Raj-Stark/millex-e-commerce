import SectionHeader from "@/components/section-header";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CategoryBox from "./category-box";

const CategorySection = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ borderBottom: "1px solid", borderColor: "#D9D9D9" }}
    >
      <SectionHeader
        sectionName="Categories"
        sectionTitle="Browse By Category"
        category="scroll-btn"
      />
      <Grid display={"flex"} justifyContent={"space-between"} my={7}>
        <CategoryBox text="Phones" />
        <CategoryBox text="Phones" />
        <CategoryBox text="Phones" />
        <CategoryBox text="Phones" />
        <CategoryBox text="Phones" />
        <CategoryBox text="Phones" />
      </Grid>
    </Container>
  );
};

export default CategorySection;
