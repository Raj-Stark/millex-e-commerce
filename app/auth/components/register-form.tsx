"use client";
import CommonButton from "@/components/button";
import { Input, Stack, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  isLogin: Boolean;
}

const RegisterForm = ({ isLogin }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form style={{ paddingBottom: "16px" }}>
      <Stack spacing={4} mt={"24px"}>
        {!isLogin && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input placeholder="Name" {...field} />}
          />
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="Email" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input placeholder="Password" {...field} />}
        />
      </Stack>

      <CommonButton sx={{ width: "100%", mt: "40px", py: 1.6 }}>
        <Typography sx={{ fontSize: "16px", textTransform: "capitalize" }}>
          {!isLogin ? "Create Account" : "Log In"}
        </Typography>
      </CommonButton>
    </form>
  );
};

export default RegisterForm;
