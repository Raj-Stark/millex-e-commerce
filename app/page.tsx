import { Stack } from "@mui/material";
import React from "react";
import HeroSection from "./components/hero-section";
import CategorySection from "./components/category-section";
import OurProducts from "./components/our-products";
import ResponsiveAppBar from "@/components/app-bar";
import Footer from "@/components/footer";
const Home = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Stack color="primary.main" direction={"column"} gap={"140px"}>
        <HeroSection />
        <CategorySection />
        <OurProducts />
      </Stack>
      <Footer />
    </>
  );
};

export default Home;
