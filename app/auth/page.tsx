"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import FormBox from "./components/form-box";
import { useAtomValue } from "jotai";
import { userAtom } from "@/commonAtoms/userAtom";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const user = useAtomValue(userAtom);

  const router = useRouter();

  useEffect(() => {
    if (user.isLoggedIn) {
      router.replace("/");
    }
  }, [user.isLoggedIn, router]);
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, position: "relative", width: "100dvw", height: "100dvh" }}>
      <Box sx={{
        position: "absolute",
        zIndex: 1,
        top: 20,
        left: 50, 
        width: {xs: "70px", sm: "100px"},
        height: {xs: "70px", sm: "100px"}
      }}>
        <Image fill src={"/assets/logo-light.png"} alt="site-logo" />
      </Box>

      <Box sx={{
        maxWidth: "100%",
        height: { xs: "100dvh", md: "100dvh" },
        flex: { md: 2 },
        padding: 0,
        top: 0,
        zIndex: 0,
        position: { xs: 'absolute', md: 'relative' },
        width: "100%",

      }}>

        <Box sx={{
          position: "absolute",
          zIndex: 1,
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }} />

        <Image
          fill={true}
          src={
            "/assets/login-banner.jpg"
          }
          alt="Farm Field"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

      </Box>
      <Box
        sx={{ zIndex: 1, flex: { md: 1 }, height: { xs: "100%", md: "auto" } }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mx={1}
      >
        <FormBox />
      </Box>
    </Box>
  );
};

export default AuthPage;
