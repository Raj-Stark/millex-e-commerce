import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";
import UserDetailForm from "./components/user-details";
import OrderItems from "./components/order-items";
import SectionHeader from "@/components/section-header";

const PlaceOrderPage = () => {
  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <Box mt={4}>
        <SectionHeader sectionName="Order Page" />
      </Box>

      <Grid container mt={2} spacing={4}>
        <Grid item xs={8}>
          <OrderItems />
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ px: 2, py: 3 }}>
            <UserDetailForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderPage;
