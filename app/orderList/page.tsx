"use client";

import SectionHeader from "@/components/section-header";
import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import OrderListTable from "./components/OrderListTable";
import LoadingState from "./components/loading-state";
import ErrorState from "./components/error-state";

const OrderListPage = () => {
  const getOrderHistoryEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}order/showAllMyOrders`;

  const {
    data: orderData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["showAllMyOrders"],
    queryFn: async () => {
      try {
        const response = await axios.get(getOrderHistoryEndpoint, {
          withCredentials: true,
        });
        return response.data.orders;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        "&.MuiContainer-root": {
          paddingLeft: { xs: 2, md: 3 },
          paddingRight: { xs: 2, md: 3 },
          mb: 10,
        },
      }}
    >
      <Box
        sx={{
          mt: 6,
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SectionHeader sectionName="Order History" />
      </Box>

      <Box>
        {isLoading && <LoadingState />}

        {isError && <ErrorState error={error} refetch={refetch} />}

        {!isLoading && !isError && orderData && (
          <OrderListTable orderData={orderData} />
        )}
      </Box>
    </Container>
  );
};

export default OrderListPage;
