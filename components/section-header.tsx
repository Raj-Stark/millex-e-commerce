import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

interface Props {
  sectionName: string;
  sectionTitle: string;
  category?: "scroll-btn" | "nextPage-btn";
}

const SectionHeader = ({ sectionName, sectionTitle }: Props) => {
  return (
    <Grid container display={"flex"} flexDirection={"column"} gap={4}>
      <Grid item display={"flex"} gap={"16px"} alignItems={"center"}>
        <Box bgcolor={"#F43F5E"} width={"20px"} height={"60px"}></Box>
        <Typography variant="subtitle" fontSize={"24px"} color={"#000000"}>
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
        <Typography variant="h3">{sectionTitle}</Typography>
      </Grid>
    </Grid>
  );
};

export default SectionHeader;
