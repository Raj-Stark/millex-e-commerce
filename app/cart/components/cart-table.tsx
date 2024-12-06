"use client";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { cartAtom } from "@/commonAtoms/cartAtom";
import { formatCurrency } from "@/utils/format-currency";
import DeleteIcon from "@mui/icons-material/Delete";

const columnWidths = {
  product: "50%",
  price: "10%",
  quantity: "20%",
  subtotal: "10%",
  removeItem: "10%",
};

const CartTable = () => {
  const [cartData, setCartData] = useAtom(cartAtom);

  const handleCartUpdate = (productId: string, action: "inc" | "dec") => {
    let updatedCart;
    if (action == "inc") {
      updatedCart = cartData.map((item) => {
        if (item.id === productId && item.quantity < item.inventory) {
          item.quantity = item.quantity + 1;
          item.cartTotal = item.quantity * item.price;
        }
        return item;
      });
    } else {
      updatedCart = cartData.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          item.quantity = item.quantity - 1;
          item.cartTotal = item.quantity * item.price;
        }
        return item;
      });
    }

    setCartData(updatedCart);
  };

  const handleDelete = (productId: string) => {
    const products = cartData.filter((item) => item.id !== productId);
    setCartData(products);
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%", mt: 10 }}>
      <Table
        sx={{ width: "100%" }}
        aria-label="product table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ width: columnWidths.product }}>
              Product
            </TableCell>
            <TableCell align="left" sx={{ width: columnWidths.price }}>
              Price
            </TableCell>
            <TableCell align="center" sx={{ width: columnWidths.quantity }}>
              Quantity
            </TableCell>
            <TableCell align="right" sx={{ width: columnWidths.subtotal }}>
              Subtotal
            </TableCell>
            <TableCell align="right" sx={{ width: columnWidths.removeItem }}>
              Remove Item
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ width: columnWidths.product }}>
                <Box
                  position={"relative"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Image
                    height={120}
                    width={120}
                    src={item.image}
                    alt="product-image"
                    style={{ objectFit: "cover" }}
                  />
                  <Typography
                    ml={2}
                    fontSize={"16px"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{ width: columnWidths.price, fontSize: "16px" }}
              >
                {formatCurrency(item.price)}
              </TableCell>
              <TableCell align="right" sx={{ width: columnWidths.quantity }}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box
                    border={"1px solid #000"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    borderRadius={"6px"}
                  >
                    <IconButton
                      disabled={item.quantity >= item.inventory}
                      sx={{
                        borderRight: "1px solid #000",
                        padding: "4px",
                        borderRadius: 0,
                        color: "#000",
                      }}
                      onClick={() => handleCartUpdate(item.id, "inc")}
                    >
                      <AddIcon />
                    </IconButton>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mx: 3,
                      }}
                    >
                      {item.quantity}
                    </Typography>

                    <IconButton
                      disabled={item.quantity < 2}
                      sx={{
                        borderLeft: "1px solid #000",
                        borderRadius: 0,
                        padding: "4px",
                        color: "#000",
                      }}
                      onClick={() => handleCartUpdate(item.id, "dec")}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="right"
                sx={{ width: columnWidths.subtotal, fontSize: "16px" }}
              >
                {formatCurrency(item.price * item.quantity)}
              </TableCell>
              <TableCell
                align="right"
                sx={{ width: columnWidths.removeItem, fontSize: "16px" }}
              >
                <IconButton
                  sx={{ color: "secondary.main" }}
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
