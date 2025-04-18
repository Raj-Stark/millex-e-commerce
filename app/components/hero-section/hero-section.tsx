"use client";
import { Box, CircularProgress, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import styles from "./styles.module.css";

const HeroSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}banner`;
      const response = await axios.get(endpoint, {
        withCredentials: true, // ✅ Ensures cookies are sent & CORS preflight is triggered
      });
      return response.data;
    },
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 0, xl: "48px" },
        color: "#000",
        borderRadius: { xs: "0px", xl: "8px" },
        overflow: "hidden",
        px: 0,
        "&.MuiContainer-root": {
          px: 0,
        },
        width: "100%",
        minHeight: "20px",
      }}
    >
      {isLoading ? (
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
        >
          {data &&
            data.banners.map((item: any) => {
              return (
                <SwiperSlide key={item._id} className={styles["swiper-slider"]}>
                  <Image
                    fill={true}
                    src={item.image}
                    alt="carousel-image"
                    style={{ objectFit: "contain", width: "100%" }}
                    priority
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </Container>
  );
};

export default HeroSection;
