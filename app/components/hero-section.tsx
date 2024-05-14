import { Box, Container, Typography } from "@mui/material";
import React from "react";

const HeroSection = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "424px",
        bgcolor: "#000000",
        color: "#ffffff",
        py: "48px",
      }}
    >
      <Box
        width={"inherit"}
        height={"inherit"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h1">Carousel</Typography>
      </Box>
    </Container>
  );
};

export default HeroSection;
