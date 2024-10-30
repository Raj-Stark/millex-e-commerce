"use client";
import ResponsiveAppBar from "@/components/app-bar";
import Footer from "@/components/footer";
import React from "react";

interface CategoryProps {
  children: React.ReactNode;
}

const CategoryLayout: React.FC<CategoryProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </>
  );
};

export default CategoryLayout;
