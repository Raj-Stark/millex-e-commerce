import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  text: string;
}

const CategoryBox = ({ text }: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      border={"3px solid"}
      borderColor={"#E9EAEC"}
      borderRadius={"4px"}
      color={"#000"}
      width={"200px"}
      height={"145px"}
      sx={{
        ":hover": {
          backgroundColor: "#DB4444",
          color: "#fff",
          borderColor: "#DB4444",
        },
      }}
    >
      <Typography>{text}</Typography>
    </Box>
  );
};

export default CategoryBox;
