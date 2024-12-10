"use client";

import CommonButton from "@/components/button";
import { Input, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { userAtom } from "@/commonAtoms/userAtom";
import appTheme from "@/config/theme";

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

  const screenSizeGreatherThanSM = useMediaQuery(appTheme.breakpoints.up('sm'));

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

    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.msg || "Failed to update user!";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to update user !!!");
      }
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
                  <Input
                    sx={{
                      '& .MuiInputBase-input::placeholder': {
                        color: { xs: 'greyScale.shade400', md: 'rgba(0, 0, 0, 0.54)' },
                        opacity: 1,
                      },
                      color: {
                        xs: 'greyScale.shade100', md: "black"
                      }
                    }}
                    placeholder="Name" {...field} error={!!error} />
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
              <Input
                sx={{
                  '& .MuiInputBase-input::placeholder': {
                    color: { xs: 'greyScale.shade400', md: 'rgba(0, 0, 0, 0.54)' }, // Change placeholder color here
                    opacity: 1, // Ensure it doesn't inherit opacity
                  },
                  color: {
                    xs: 'greyScale.shade100', md: "black"
                  }
                }}
                placeholder="Email" {...field} error={!!error} />

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
                sx={{
                  '& .MuiInputBase-input::placeholder': {
                    color: { xs: 'greyScale.shade400', md: 'rgba(0, 0, 0, 0.54)' }, // Change placeholder color here
                    opacity: 1, // Ensure it doesn't inherit opacity
                  },
                  color: {
                    xs: 'greyScale.shade100', md: "black"
                  }
                }}
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
        size={(() => {
          if (screenSizeGreatherThanSM) {
            return "large"
          }
          return "small"
        })()}
        type="submit"
        disabled={isPending}
        sx={{ width: "100%", mt: { xs: "24px", sm: "40px" } }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "bold", textTransform: "capitalize" }}>
          {isPending ? "Loading..." : !isLogin ? "CREATE ACCOUNT" : "Log In"}
        </Typography>
      </CommonButton>
    </form>
  );
};

export default RegisterForm;
