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
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, position: "relative" }}>
      <Box sx={{
        maxWidth: "100%",
        height: { xs: "200px", sm: "300px", md: "100dvh" },
        flex: { md: 1.5 },
        width: { md: "50%" },
        padding: 0,
        top: 0,
        position: "sticky",
      }}>

        <Image
          fill={true}
          src={
            "https://images.unsplash.com/photo-1696010619929-493071e82b0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Farm Field"
          style={{
            objectFit: "cover",
            objectPosition: "center"
          }}
        />

      </Box>
      <Box
        sx={{ zIndex: 1, paddingBottom: 10, paddingTop: { xs: 0, sm: 10 }, marginTop: { xs: 0, sm: -20, md: 0 }, flex: { md: 1 } }}
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
