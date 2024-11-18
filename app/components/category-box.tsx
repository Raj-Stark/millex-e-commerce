"use client";
import { Box, Typography, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  imgUrl: string;
  categoryId: string;
}

const CategoryBox = ({ text, imgUrl, categoryId }: Props) => {
  const router = useRouter();
  return (
    <Paper
      component={"article"}
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        height: "350px",
        width: "280px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={imgUrl}
        alt="Machine Image"
        fill={true}
        sizes={"100%"}
        style={{
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <Box
        onClick={() => router.push(`/ItemByCategory/${categoryId}`)}
        sx={{
          cursor: "pointer",
          position: "relative",
          height: "100%",
          width: "100%",
          zIndex: 2,
          bgcolor: "#000000",
          opacity: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ zIndex: 5, color: "#fff" }}>
          {text}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CategoryBox;
