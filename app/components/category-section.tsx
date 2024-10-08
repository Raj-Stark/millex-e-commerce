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
      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        my={7}
        columnGap={4}
      >
        <CategoryBox
          text="Rice Mill Machines"
          imgUrl="https://laxmiflourmill.com/cdn/shop/products/mini-rice-mill-with-grader-machine-3-hp-rice-mill-price-in-india.jpg?v=1691837019"
        />
        <CategoryBox
          text="Flour Mill Machines"
          imgUrl="https://laxmiflourmill.com/cdn/shop/files/5-hp-pulverizer-machine-5-hp-pulveriser-machine-02.jpg?v=1725356751"
        />
        <CategoryBox
          text="Pulverizer Machines"
          imgUrl="https://laxmiflourmill.com/cdn/shop/products/mirchi-kandap-machine-heavy-dunk-machine-for-masala-two-stick-with-2-hp-motor.jpg?v=1691836895s"
        />
        <CategoryBox
          text="Chaff Cutter Machines"
          imgUrl="https://laxmiflourmill.com/cdn/shop/products/PaddyThreserMachine.jpg?v=1691837128"
        />
        <CategoryBox
          text="Spare Parts"
          imgUrl="https://chetanagro.com/wp-content/uploads/2024/03/OIL-MILL-PARTS-1-chetanagro.webp"
        />
        {/* <CategoryBox text="Phones" /> */}
      </Grid>
    </Container>
  );
};

export default CategorySection;
