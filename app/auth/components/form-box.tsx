"use client";

import { Paper, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { Google } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/commonAtoms/userAtom";
import { toast } from "react-toastify";

const FormBox = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const responseGoogle = async (authResult: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // to receive the token cookie
          body: JSON.stringify({ code: authResult.code }),
        },
      );

      if (!response.ok) {
        throw new Error("Google login failed");
      }

      const data = await response.json();

      setUser({
        isLoggedIn: true,
        name: data.user.name,
        userId: data.user.userId,
      });

      toast.success("Login successful");
      router.replace("/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Paper
      component="article"
      sx={{
        maxWidth: "400px",
        padding: 4,
        minWidth: { xs: 0, md: "350px" },
        backdropFilter: "blur(8px)",
        mx: 2,
        backgroundColor: { xs: "rgba(255,255,255,0.1)", md: "white" },
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography
          color={{ xs: "white", md: "black" }}
          sx={{ fontSize: { xs: "24px", sm: "36px" }, fontWeight: "medium" }}
        >
          Welcome to Farm Gear
        </Typography>
        <Typography
          color={{ xs: "white", md: "black" }}
          sx={{ fontSize: { xs: "12px", sm: "16px" }, fontWeight: "medium" }}
        >
          Login with your Google Account
        </Typography>

        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={() => googleLogin()}
          sx={{
            color: "black",
            borderColor: "black",
            textTransform: "none",
            width: "100%",
          }}
        >
          Continue with Google
        </Button>
      </Stack>
    </Paper>
  );
};

export default FormBox;
