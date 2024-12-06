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
        maxWidth: "400px",
        padding: 4,
      }}
    >
      <Stack spacing={1}>
        <Typography sx={{ fontSize: { xs: '24px', sm: '36px' }, fontWeight: "medium" }}>
          {!isLogin ? "Create an account" : "Login To Exclusive"}
        </Typography>
        <Typography sx={{ fontSize: { xs: '12px', sm: '16px' }, fontWeight: "medium" }}>
          Enter your details below
        </Typography>
        <RegisterForm isLogin={isLogin} />

        {!isLogin ? (
          <Typography fontSize={{ xs: '12px', sm: '16px' }} sx={{ textAlign: "center", mt: "40px" }}>
            Already have an account ?{" "}
            <Link
              onClick={() => setIsLogin(true)}
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
        ) : (
          <Typography
            fontSize={{ xs: '12px', sm: '16px' }}
            onClick={() => setIsLogin(false)}
            sx={{
              ml: 1,
              pb: 1,
              color: "secondary.main",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Go Back
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default FormBox;
