import { Alert, Button, Paper } from "@mui/material";
import React from "react";

const ErrorState = ({ error, refetch }: { error: any; refetch: any }) => {
  return (
    <Paper
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: "600px",
        mx: "auto",
        mt: 4,
      }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {error?.response?.data?.msg ||
          "Failed to load orders. Please try again."}
      </Alert>
      <Button variant="outlined" onClick={() => refetch()}>
        Retry Loading
      </Button>
    </Paper>
  );
};
export default ErrorState;
