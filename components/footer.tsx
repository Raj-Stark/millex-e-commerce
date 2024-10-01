import { Container } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Container
      component={"footer"}
      sx={{
        bgcolor: "#000",
        color: "#fff",
        height: "250px",
        "&.MuiContainer-root": {
          maxWidth: "100vw",
        },
      }}
    >
      footer
    </Container>
  );
};

export default Footer;
