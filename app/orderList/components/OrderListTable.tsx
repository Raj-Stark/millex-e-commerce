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
            <Box sx={{ display: "flex", gap: { xs: 1, md: 3 }, alignItems: { xs: 'flex-start', md: "center" }, flexDirection: { xs: "column", md: 'row' } }}>
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
            <Table
              sx={{
                width: "100%", display: { xs: 'block', md: 'table' },
                '& tr': {
                  display: { xs: 'flex', md: 'table-row' }, flexDirection: "column", borderBottom: { xs: '1px solid rgba(224, 224, 224, 1)' },
                },
                '& td': {
                  display: { xs: 'flex', md: 'table-cell', flexDirection: 'column', borderBottom: 'none' },
                },
                '& thead': {
                  display: { xs: 'none', md: 'table-header-group' }, flexDirection: 'column',
                },
                '& tbody': {
                  display: { xs: 'block', md: 'table-row-group' },
                },
              }}
              size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Product
                  </TableCell>
                  <TableCell>
                    Price
                  </TableCell>
                  <TableCell>
                    Qty
                  </TableCell>
                  <TableCell align="right">
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orderItems.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'auto', md: 'center' }}>
                        <Image
                          src={item.image}
                          height={60}
                          width={60}
                          alt={item.name}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                        <Typography sx={{ ml: { xs: 0, md: 1.5 }, mt: { xs: 2, md: 0 }, fontSize: "16px", fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography display={{ xs: 'block', md: 'none' }}>Price: </Typography>
                        <Typography>{formatCurrency(item.price)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"} alignItems={'center'} justifyContent={{ xs: 'space-between', md: 'flex-start' }}>
                        <Typography display={{ xs: 'block', md: 'none' }}>Quantity: </Typography>
                        <Typography>
                          {item.amount}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"} justifyContent={{ xs: 'space-between', md: 'flex-end' }}>
                        <Typography display={{ xs: 'block', md: 'none' }}>Subtotal: </Typography>
                        <Typography>{formatCurrency(item.price * item.amount)}</Typography>
                      </Box>
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
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box display={"flex"} gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
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
