import { Stack, Box } from "@mui/material";
import React from "react";
import HeroSection from "./components/hero-section";
import CategorySection from "./components/category-section";
import OurProducts from "./components/our-products";
import Services from "./components/Services";

const Home = () => {
  return (
    <Stack
      color="primary.main"
      direction="column"
      gap="100px"
      alignItems="center"
    >
      <HeroSection />
      <CategorySection />
      <OurProducts />
      <Services />
    </Stack>
  );
};

export default Home;
