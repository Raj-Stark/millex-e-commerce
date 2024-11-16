import { Box, Container, Grid } from "@mui/material";
import React from "react";
import UserDetailList from "./components/user-details";
import OrderItems from "./components/order-items";
import SectionHeader from "@/components/section-header";

const PlaceOrderPage = () => {
  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <Box mt={4}>
        <SectionHeader sectionName="Order Page" />
      </Box>

      <Grid container mt={2} mb={4} spacing={4}>
        <Grid item xs={7}>
          <OrderItems />
        </Grid>

        <Grid item xs={5}>
          <UserDetailList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderPage;
