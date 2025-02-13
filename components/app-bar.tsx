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
  useMediaQuery,
  Button,
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
import Image from "next/image";
import appTheme from "@/config/theme";
import appBarStyles from "./app-bar-styles.module.css";

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
          <Badge badgeContent={wishlist.length} color="secondary">
            <FavoriteBorderOutlinedIcon />
          </Badge>
          <ListItemText primary="Wishlist" sx={{ ml: 2 }} />
        </ListItem>
        <ListItem button onClick={() => router.push("/cart")}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartRoundedIcon />
          </Badge>
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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          width: "100%",
          px: { xs: "16px !important", sm: "24px !important" },
          "&.MuiContainer-root": {
            padding: 0,
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="/">
            <div className={appBarStyles["logo-container"]}>
              <Image fill src="/assets/logo.avif" alt="logo" />
            </div>
          </a>

          <Box sx={{ flexGrow: 1 }}>
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
              <Button
                sx={{ color: "#000" }}
                size="medium"
                onClick={() => router.push("/profile")}
              >
                <AccountCircleIcon style={{ fontSize: "28px" }} />
                <Typography
                  sx={{ fontSize: "16px", ml: 1, textTransform: "none" }}
                >
                  {user.name}
                </Typography>
              </Button>
            ) : (
              <Button
                sx={{ color: "#000" }}
                size="medium"
                onClick={() => router.push("/auth")}
              >
                <Typography
                  sx={{ fontSize: "16px", ml: 1, textTransform: "none" }}
                >
                  Login/Register
                </Typography>
              </Button>
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
