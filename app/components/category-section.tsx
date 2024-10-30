"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import SectionHeader from "@/components/section-header";
import { Container, Grid } from "@mui/material";
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
      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        my={7}
        columnGap={4}
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
      </Grid>
    </Container>
  );
};

export default CategorySection;
