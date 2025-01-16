"use client";
import {
  Box,
  Button,
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
        sx={{
          width: "100%",
          display: { xs: "block", md: "table" },
          "& tr": {
            display: { xs: "flex", md: "table-row" },
            flexDirection: "column",
            borderBottom: { xs: "1px solid rgba(224, 224, 224, 1)" },
          },
          "& td": {
            display: {
              xs: "flex",
              md: "table-cell",
              flexDirection: "column",
              borderBottom: "none",
            },
          },
          "& thead": {
            display: { xs: "none", md: "table-header-group" },
            flexDirection: "column",
          },
          "& tbody": {
            display: { xs: "block", md: "table-row-group" },
          },
        }}
        aria-label="product table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell sx={{ textAlign: { xs: "left", md: "center" } }}>
              Quantity
            </TableCell>
            <TableCell sx={{ textAlign: { xs: "left", md: "right" } }}>
              Subtotal
            </TableCell>
            <TableCell sx={{ textAlign: { xs: "left", md: "right" } }}>
              Remove Item
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>
                <Box
                  position={"relative"}
                  flexDirection={{ xs: "column", md: "row" }}
                  display={"flex"}
                  alignItems={{ xs: "auto", md: "center" }}
                >
                  <Image
                    height={120}
                    width={120}
                    src={item.image}
                    alt="product-image"
                    style={{ objectFit: "cover" }}
                  />
                  <Typography
                    ml={{ xs: 0, md: 2 }}
                    mt={{ xs: 2, md: 0 }}
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    sx={{
                      maxWidth: "300px",
                      overflow: { md: "hidden" },
                      textOverflow: { md: "ellipsis" },
                      whiteSpace: { md: "nowrap" },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "16px",
                }}
              >
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography display={{ xs: "block", md: "none" }}>
                    Price:{" "}
                  </Typography>
                  <Typography>{formatCurrency(item.price)}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={{ xs: "space-between", md: "center" }}
                >
                  <Typography display={{ xs: "block", md: "none" }}>
                    Quantity:{" "}
                  </Typography>
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
              <TableCell align="right" sx={{ fontSize: "16px" }}>
                <Box
                  display={"flex"}
                  justifyContent={{ xs: "space-between", md: "flex-end" }}
                >
                  <Typography display={{ xs: "block", md: "none" }}>
                    Subtotal:{" "}
                  </Typography>
                  <Typography>
                    {formatCurrency(item.price * item.quantity)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "16px" }}>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="contained"
                  sx={{
                    background: "red",
                    display: { xs: "block", md: "none" },
                  }}
                >
                  Remove
                </Button>
                <IconButton
                  sx={{
                    color: "secondary.main",
                    display: { xs: "none", md: "inline-block" },
                  }}
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
