"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Input } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { triggerLogin } from "@/utils/triggerLogin";
import { useAtomValue } from "jotai";
import { userAtom } from "@/commonAtoms/userAtom";
import { useRouter } from "next/navigation";

function ResponsiveAppBar() {
  const user = useAtomValue(userAtom);

  const router = useRouter();
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

          <Input
            placeholder="What are you looking for ?"
            type="text"
            sx={{
              border: "1px solid #000",
              borderRadius: "5px",
              paddingX: 1,
              width: "800px",
              ml: "120px",

              fontSize: { xs: "6px", sm: "14px" },
            }}
          />

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
              onClick={() => triggerLogin(user.isLoggedIn)}
            >
              <FavoriteBorderOutlinedIcon style={{ fontSize: "28px" }} />
            </IconButton>
            <IconButton
              sx={{ color: "#000" }}
              size="medium"
              onClick={() => triggerLogin(user.isLoggedIn)}
            >
              <ShoppingCartRoundedIcon style={{ fontSize: "28px" }} />
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
