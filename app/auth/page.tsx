"use client";
import { Container, Grid } from "@mui/material";
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
    <Grid container>
      <Grid item xs={8}>
        <Container
          sx={{
            "&.MuiContainer-root": {
              maxWidth: "100%",
              height: "100vh",
              padding: 0,
              position: "relative",
            },
          }}
        >
          <Image
            fill={true}
            src={
              "https://images.unsplash.com/photo-1696010619929-493071e82b0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Farm Field"
          />
        </Container>
      </Grid>
      <Grid
        item
        xs={4}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <FormBox />
      </Grid>
    </Grid>
  );
};

export default AuthPage;
