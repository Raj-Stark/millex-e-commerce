import ResponsiveAppBar from "@/components/app-bar";
import Footer from "@/components/footer";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const SingleProductLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </>
  );
};

export default SingleProductLayout;
