"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import SectionHeader from "@/components/section-header";
import { Box, Container } from "@mui/material";
import React from "react";
import CategoryBox from "./category-box";

const CategorySection = () => {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}category`;
      const response = await axios.get(endpoint);
      return response.data;
    },
  });

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
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          mt: 2,
          gap: { xs: 2, sm: 3 },
          pb: 1,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {data &&
          data.categories.map((item: any) => {
            return (
              <Box
                key={item._id}
                sx={{
                  display: "inline-block",
                  flex: "0 0 auto",
                }}
              >
                <CategoryBox
                  text={item.name}
                  imgUrl={item.image}
                  categoryId={item._id}
                />
              </Box>
            );
          })}
      </Box>
    </Container>
  );
};

export default CategorySection;
