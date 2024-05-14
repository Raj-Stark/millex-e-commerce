"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Icon, IconButton, Input } from "@mui/material";
import Heart from "@/icons/heart";
import Cart from "@/icons/cart";

function ResponsiveAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "greyScale.white",
        color: "#000",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          background: "greyScale.white",
          md: {
            maxWidth: "sm",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
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

          <Box
            display={"flex"}
            alignItems={"center"}
            gap={{ xs: 1, sm: 2 }}
            sx={{
              flexShrink: { xs: 0, md: 1 },
              flexGrow: 0,
            }}
          >
            <Input
              placeholder="What are you looking for ?"
              sx={{
                width: { xs: "80px", sm: "100%" },
                fontSize: { xs: "6px", sm: "14px" },
              }}
            />

            <IconButton size="medium">
              <Heart />
            </IconButton>
            <IconButton sx={{ fontSize: "12px" }} size="medium">
              <Cart />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
