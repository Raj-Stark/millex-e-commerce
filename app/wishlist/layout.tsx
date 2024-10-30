import ResponsiveAppBar from "@/components/app-bar";
import Footer from "@/components/footer";
import React from "react";

interface ProfileProps {
  children: React.ReactNode;
}

const WishlistLayout: React.FC<ProfileProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </>
  );
};

export default WishlistLayout;
