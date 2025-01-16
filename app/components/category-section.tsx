"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import SectionHeader from "@/components/section-header";
import { Box, Container, SxProps, Theme } from "@mui/material";
import React from "react";
import CategoryBox from "./category-box";

interface IProps {
  sx?: SxProps<Theme>;
}

const CategorySection = (props: IProps) => {
  const sx = props.sx || {};
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
      sx={{ borderBottom: "1px solid", borderColor: "#D9D9D9", ...sx }}
    >
      <SectionHeader
        sectionName="Categories"
        sectionTitle="Browse By Category"
        category="scroll-btn"
      />
      <Box
        sx={{ display: "flex", overflowY: "auto" }}
        my={{ xs: "20px", sm: "40px" }}
        columnGap={{ xs: "10px", sm: "20px", md: "40px" }}
      >
        {data &&
          data.categories.map((item: any) => {
            return (
              <CategoryBox
                key={item._id}
                text={item.name}
                imgUrl={item.image}
                categoryId={item._id}
              />
            );
          })}
      </Box>
    </Container>
  );
};

export default CategorySection;
