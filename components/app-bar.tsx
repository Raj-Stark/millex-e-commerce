"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import {
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
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

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button onClick={() => router.push("/wishlist")}>
          <FavoriteBorderOutlinedIcon />
          <ListItemText primary="Wishlist" sx={{ ml: 2 }} />
        </ListItem>
        <ListItem button onClick={() => router.push("/cart")}>
          <ShoppingCartRoundedIcon />
          <ListItemText primary="Cart" sx={{ ml: 2 }} />
        </ListItem>
        <ListItem
          button
          onClick={() => router.push(user.isLoggedIn ? "/profile" : "/auth")}
        >
          <AccountCircleIcon />
          <ListItemText
            primary={user.isLoggedIn ? user.name : "Login/Register"}
            sx={{ ml: 2 }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "greyScale.white",
        color: "#000",
        height: { xs: "auto", md: "80px" },
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
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              display: { xs: "flex", md: "block" },
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, mx: { xs: 1, md: 3 }, display: "flex" }}>
            <SearchBar />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <IconButton
              size="medium"
              sx={{ color: "#000" }}
              onClick={() => router.push("/wishlist")}
            >
              <Badge badgeContent={wishlist.length} color="secondary">
                <FavoriteBorderOutlinedIcon style={{ fontSize: "28px" }} />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ color: "#000" }}
              size="medium"
              onClick={() => router.push("/cart")}
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

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ color: "#000" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default ResponsiveAppBar;
