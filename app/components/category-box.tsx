"use client";
import { Box, Typography, Paper, Card } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  imgUrl: string;
}

const CategoryBox = ({ text, imgUrl }: Props) => {
  const router = useRouter();
  return (
    <Paper
      component={"article"}
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "3px solid",
        borderRadius: "8px",
        // borderColor: "#E9EAEC",
        width: "500px",
        height: "300px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={imgUrl}
        alt="Machine Image"
        fill={true}
        style={{
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <Box
        onClick={() => router.push(`/ItemByCategory?text=${text}`)}
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
