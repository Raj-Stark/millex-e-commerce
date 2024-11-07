"use client";
import { cartAtom } from "@/commonAtoms/cartAtom";

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
} from "@mui/material";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";
import PlaceOrderBox from "./place-order-box";

const columnWidths = {
  product: "50%",
  price: "20%",
  quantity: "10%",
  total: "20%",
};

const OrderItems = () => {
  const cartItems = useAtomValue(cartAtom);

  return (
    <TableContainer
      component={Paper}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="order items table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: columnWidths.product }}>Product</TableCell>
            <TableCell sx={{ width: columnWidths.price }}>Price</TableCell>
            <TableCell sx={{ width: columnWidths.quantity }}>
              Quantity
            </TableCell>
            <TableCell sx={{ width: columnWidths.total }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Image
                    src={item.image}
                    height={80}
                    width={80}
                    alt={item.title}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                  <Typography sx={{ ml: 2, fontSize: "16px", fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{formatCurrency(item.cartTotal)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PlaceOrderBox />
    </TableContainer>
  );
};

export default OrderItems;
