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
      <Stack color="primary.main" direction={"column"}>
        <HeroSection />
        <CategorySection sx={{ mt: { xs: "20px", md: "80px", xl: "120px" } }} />
        <OurProducts
          sx={{ mt: { xs: "50px", md: "80px", xl: "120px" }, mb: "50px" }}
        />
      </Stack>
      <Footer />
    </>
  );
};

export default Home;
