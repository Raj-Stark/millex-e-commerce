"use client";

import CommonButton from "@/components/button";
import { Input, Stack, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useSetAtom } from "jotai";
import { userAtom } from "@/commonAtoms/userAtom";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface Props {
  isLogin: boolean;
}

const RegisterForm = ({ isLogin }: Props) => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: submitAuth, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const endpoint = isLogin
        ? `${process.env.NEXT_PUBLIC_LOCAL_URL}auth/login`
        : `${process.env.NEXT_PUBLIC_LOCAL_URL}auth/register`;

      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Successfully logged in");
      setUser({
        isLoggedIn: true,
        name: data.user.name,
        userId: data.user.userId,
      });
      router.replace("/");
    },
    onError: () => {
      toast.error("Something went wrong! Failed to log in");
    },
  });

  const onSubmit = (data: FormData) => {
    submitAuth(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: "16px" }}>
      <Stack mt={"24px"} spacing={2}>
        {!isLogin && (
          <>
            <Controller
              name="name"
              control={control}
              rules={{ required: !isLogin && "Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input placeholder="Name" {...field} error={!!error} />
                  {errors.name && (
                    <Typography
                      component={"span"}
                      sx={{ color: "secondary.main" }}
                    >
                      {errors.name.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </>
        )}

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input placeholder="Email" {...field} error={!!error} />

              {errors.email && (
                <Typography component={"span"} sx={{ color: "secondary.main" }}>
                  {errors.email.message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                placeholder="Password"
                type="password"
                {...field}
                error={!!error}
              />
              {errors.password && (
                <Typography component={"span"} sx={{ color: "secondary.main" }}>
                  {errors.password.message}
                </Typography>
              )}
            </>
          )}
        />
      </Stack>

      <CommonButton
        type="submit"
        disabled={isPending}
        sx={{ width: "100%", mt: "40px", py: 1.6 }}
      >
        <Typography sx={{ fontSize: "16px", textTransform: "capitalize" }}>
          {isPending ? "Loading..." : !isLogin ? "Create Account" : "Log In"}
        </Typography>
      </CommonButton>
    </form>
  );
};

export default RegisterForm;
