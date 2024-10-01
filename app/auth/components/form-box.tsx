"use client";

import { Link, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import RegisterForm from "./register-form";

const FormBox = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Paper
      component={"article"}
      sx={{
        width: "400px",
        padding: 4,
      }}
    >
      <Stack spacing={1}>
        <Typography sx={{ fontSize: "36px", fontWeight: "medium" }}>
          {!isLogin ? "Create an account" : "Login To Exclusive"}
        </Typography>
        <Typography sx={{ fontSize: "16px" }}>
          Enter your details below
        </Typography>
        <RegisterForm isLogin={isLogin} />

        <Typography sx={{ textAlign: "center", mt: "40px" }}>
          Already have an account ?{" "}
          <Link
            onClick={() => setIsLogin(!isLogin)}
            sx={{
              ml: 1,
              pb: 1,
              color: "secondary.main",
              cursor: "pointer",
            }}
          >
            Log In
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default FormBox;
