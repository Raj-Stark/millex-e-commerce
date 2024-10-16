"use client";
import SectionHeader from "@/components/section-header";
import { Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "./product-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OurProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product`;
      const response = await axios.get(endpoint);
      return response.data;
    },
  });

  return (
    <Container maxWidth="xl">
      <SectionHeader
        sectionName={"Our Products"}
        sectionTitle={"Explore Our Products"}
        category={"scroll-btn"}
      />
      <Grid container spacing={3}>
        {data &&
          data.products.map((item: any) => {
            if (item.featured) {
              return (
                <Grid item xs={3} key={item._id}>
                  <ProductCard
                    reviewCount={item?.numOfReviews}
                    rating={item?.averageRating ?? 1}
                    title={item?.name}
                    image={item?.image}
                    price={item?.price}
                    id={item._id}
                  />
                </Grid>
              );
            }
          })}
      </Grid>
    </Container>
  );
};

export default OurProducts;
