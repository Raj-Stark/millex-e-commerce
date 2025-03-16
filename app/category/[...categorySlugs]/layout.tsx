import ResponsiveAppBar from "@/components/app-bar";
import Footer from "@/components/footer";
import { Box } from "@mui/material";
import React from "react";

interface CategoryProps {
  children: React.ReactNode;
}

const CategoryLayout: React.FC<CategoryProps> = ({ children }) => {
  return (
    <Box>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </Box>
  );
};

export default CategoryLayout;
