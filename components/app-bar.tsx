"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Badge, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAtomValue } from "jotai";
import { userAtom } from "@/commonAtoms/userAtom";
import { useRouter } from "next/navigation";
import { cartAtom } from "@/commonAtoms/cartAtom";
import { wishListAtom } from "@/commonAtoms/wishListAtom";
import SearchBar from "./search-bar";

function ResponsiveAppBar() {
  const user = useAtomValue(userAtom);
  const wishlist = useAtomValue(wishListAtom);
  const cart = useAtomValue(cartAtom);
  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "greyScale.white",
        color: "#000",
        height: "80px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          mt: 1,
          "&.MuiContainer-root": {
            padding: 0,
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            onClick={() => router.push("/")}
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <SearchBar />

          <Box
            display={"flex"}
            alignItems={"center"}
            gap={{ xs: 1, sm: 3 }}
            sx={{
              flexShrink: { xs: 0, md: 1 },
              flexGrow: 0,
            }}
          >
            <IconButton
              size="medium"
              sx={{ color: "#000" }}
              onClick={() => {
                router.push("/wishlist");
              }}
            >
              <Badge badgeContent={wishlist.length} color="secondary">
                <FavoriteBorderOutlinedIcon style={{ fontSize: "28px" }} />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ color: "#000" }}
              size="medium"
              onClick={() => {
                router.push("/cart");
              }}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartRoundedIcon style={{ fontSize: "28px" }} />
              </Badge>
            </IconButton>
            {user.isLoggedIn ? (
              <IconButton
                sx={{ color: "#000" }}
                size="medium"
                onClick={() => router.push("/profile")}
              >
                <AccountCircleIcon style={{ fontSize: "28px" }} />
                <Typography sx={{ fontSize: "16px", ml: 1 }}>
                  {user.name}
                </Typography>
              </IconButton>
            ) : (
              <IconButton
                sx={{ color: "#000" }}
                size="medium"
                onClick={() => router.push("/auth")}
              >
                <Typography sx={{ fontSize: "16px", ml: 1 }}>
                  Login/Register
                </Typography>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
