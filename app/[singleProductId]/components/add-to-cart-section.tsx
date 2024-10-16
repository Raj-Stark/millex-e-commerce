"use client";
import CommonButton from "@/components/button";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const AddToCartSection = () => {
  return (
    <Stack direction={"column"} spacing={2} mt={4} width={"32%"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          border={"2px solid #000"}
          display={"flex"}
          justifyContent={"space-between"}
          borderRadius={"6px"}
          width={"180px"}
        >
          <IconButton
            sx={{
              borderRight: "2px solid #000",
              borderRadius: 0,
              color: "#000",
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {1}
          </Typography>

          <IconButton
            sx={{
              borderLeft: "2px solid #000",
              borderRadius: 0,
              color: "#000",
            }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>

        <IconButton
          sx={{
            border: "2px solid #000",
            borderRadius: "6px",
            width: "60px",
            color: "#000",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
      <CommonButton sx={{ py: 1.6 }}>
        <Typography>Buy Now !!</Typography>
      </CommonButton>
    </Stack>
  );
};

export default AddToCartSection;
