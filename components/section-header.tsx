import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface Props {
  sectionName: string;
  sectionTitle?: string;
  category?: "scroll-btn" | "nextPage-btn";
}

const SectionHeader = ({ sectionName, sectionTitle }: Props) => {
  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      gap={{ xs: 2, sm: 4 }}
    >
      <Grid item display={"flex"} gap={"16px"} alignItems={"center"}>
        <Box
          bgcolor={"#F43F5E"}
          width={{ xs: "15px", md: "20px" }}
          height={{ xs: "40px", sm: "60px" }}
        ></Box>
        <Typography
          variant="subtitle"
          fontSize={{ xs: "16px", sm: "24px" }}
          color={"#000000"}
        >
          {sectionName}
        </Typography>
      </Grid>
      <Grid
        item
        display={"flex"}
        gap={"16px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={"#000"}
      >
        <Typography variant="h3" fontSize={{ xs: "16px", sm: "24px" }}>
          {sectionTitle}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SectionHeader;
