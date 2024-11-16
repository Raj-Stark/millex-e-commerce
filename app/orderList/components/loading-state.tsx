import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingState = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "300px",
      gap: 2,
    }}
  >
    <CircularProgress size={40} />
    <Typography color="text.secondary">Loading your orders...</Typography>
  </Box>
);
export default LoadingState;
