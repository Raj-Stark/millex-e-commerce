"use client";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface OrderFinalPageProps {
  params: {
    orderId: string;
  };
}

const OrderFinalPage = ({ params }: OrderFinalPageProps) => {
  const router = useRouter();
  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <Box>
        <Typography
          fontSize={"28px"}
          fontWeight={"600"}
          color={"secondary.main"}
          textAlign={"center"}
          mt={4}
        >
          Congratulations : You have successfully placed an Order !!!
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography mt={4} fontSize={"16px"} fontWeight={"600"}>
            Your Order ID : {params.orderId}{" "}
          </Typography>

          <Typography
            onClick={() => router.replace("/orderList")}
            sx={{
              textTransform: "capitalize",
              textDecoration: "underline",
              color: "secondary.main",
              pt: 2,
              cursor: "pointer",
            }}
          >
            Check Your Order History
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderFinalPage;
