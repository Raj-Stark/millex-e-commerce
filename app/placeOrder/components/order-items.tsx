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
      <Table sx={{
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
        aria-label="order items table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>
              Quantity
            </TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'auto', md: 'center' }}>
                  <Image
                    src={item.image}
                    height={80}
                    width={80}
                    alt={item.title}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                  <Typography sx={{ ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 }, fontSize: "16px", fontWeight: 500 }}>
                    {item.title}
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
                <Box display={"flex"} alignItems={'center'} justifyContent={{ xs: 'space-between', md: 'center' }}>
                  <Typography display={{ xs: 'block', md: 'none' }}>Quantity: </Typography>
                  <Typography>
                    {item.quantity}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} justifyContent={{ xs: 'space-between', md: 'flex-end' }}>
                  <Typography display={{ xs: 'block', md: 'none' }}>Subtotal: </Typography>
                  <Typography>{formatCurrency(item.price * item.quantity)}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PlaceOrderBox />
    </TableContainer>
  );
};

export default OrderItems;
