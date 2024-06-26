import { Stack } from "@mui/material";
import React from "react";
import HeroSection from "./components/hero-section";
import CategorySection from "./components/category-section";
import OurProducts from "./components/our-products";

const Home = () => {
  return (
    <Stack color="primary.main" direction={"column"} gap={"140px"}>
      <HeroSection />
      <CategorySection />
      <OurProducts />
    </Stack>
  );
};

export default Home;
