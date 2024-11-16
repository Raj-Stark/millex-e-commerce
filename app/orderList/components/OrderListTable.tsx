"use client";

import { formatCurrency } from "@/utils/format-currency";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const columnWidths = {
  product: "35%",
  price: "15%",
  quantity: "10%",
  total: "15%",
  status: "15%",
};

const OrderListTable = ({ orderData = [] }) => {
  if (!orderData || orderData.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography>No orders found</Typography>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
      {orderData.map((order: any) => (
        <Paper key={order._id} sx={{ mb: 8, overflow: "hidden" }}>
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#f9f9f9",
            }}
          >
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Typography variant="h5M" color="text.secondary">
                {formatDate(order.createdAt)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {order._id}
              </Typography>
              <Chip
                label={order.status.toUpperCase()}
                color={getStatusColor(order.status)}
                size="small"
              />
            </Box>
          </Box>

          {/* Order Items */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: columnWidths.product }}>
                    Product
                  </TableCell>
                  <TableCell sx={{ width: columnWidths.price }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ width: columnWidths.quantity }}>
                    Qty
                  </TableCell>
                  <TableCell sx={{ width: columnWidths.total }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orderItems.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Image
                          src={item.image}
                          height={60}
                          width={60}
                          alt={item.name}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1.5, fontWeight: 500 }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      {formatCurrency(item.price * item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Order Summary */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #eee",
              p: 2,
              gap: 3,
              bgcolor: "#f9f9f9",
            }}
          >
            <Box display={"flex"} gap={2}>
              <Typography variant="body1" color="text.secondary">
                Subtotal: {formatCurrency(order.subtotal)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Shipping: {formatCurrency(order.shippingFee)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tax: {formatCurrency(order.tax)}
              </Typography>
            </Box>

            <Typography variant="body1" textAlign={"left"} fontWeight="medium">
              Total: {formatCurrency(order.total)}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default OrderListTable;
