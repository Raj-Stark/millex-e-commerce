"use client";

import { Box, Typography, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  text: string;
  imgUrl: string;
  categoryId: string;
  slug: string;
  onClick?: () => void;
}

const CategoryBox = ({ text, imgUrl, slug, onClick }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/category/${slug}`);
    }
  };

  return (
    <Paper
      component="article"
      elevation={3}
      sx={{
        display: "flex",
        flex: 1,
        minWidth: { xs: "210px" },
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        height: "300px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={imgUrl}
        alt={`${text} Image`}
        fill
        sizes="100%"
        style={{
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <Box
        onClick={handleClick}
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
