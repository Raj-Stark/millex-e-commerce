"use client";
import CommonButton from "@/components/button";
import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  current: string;
  new: string;
  confirm: string;
}

const UserPasswordUpdateForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      current: "",
      new: "",
      confirm: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}user/updateUserPassword`,
        {
          oldPassword: data.current,
          newPassword: data.new,
        },
        { withCredentials: true }
      );
    },

    onSuccess: () => {
      toast.success("Password update successfully !!!");
    },
    onError: () => {
      toast.error("Failed to update password !!!");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={8} rowSpacing={4}>
        <Grid item xs={12}>
          <Controller
            name="current"
            control={control}
            rules={{ required: "Current password is required" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  variant="filled"
                  placeholder="Current Password"
                  type="password"
                  {...field}
                  error={!!error}
                  sx={{
                    width: "100%",
                    "& .MuiFilledInput-input": {
                      padding: 1.4,
                    },
                  }}
                />
                {errors.current && (
                  <Typography component="span" sx={{ color: "secondary.main" }}>
                    {errors.current.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="new"
            control={control}
            rules={{ required: "New password is required" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  variant="filled"
                  placeholder="New Password"
                  type="password"
                  {...field}
                  error={!!error}
                  sx={{
                    width: "100%",
                    "& .MuiFilledInput-input": {
                      padding: 1.4,
                    },
                  }}
                />
                {errors.new && (
                  <Typography component="span" sx={{ color: "secondary.main" }}>
                    {errors.new.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="confirm"
            control={control}
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === control._formValues.new || "Passwords do not match",
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  variant="filled"
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                  error={!!error}
                  sx={{
                    width: "100%",
                    "& .MuiFilledInput-input": {
                      padding: 1.4,
                    },
                  }}
                />
                {errors.confirm && (
                  <Typography component="span" sx={{ color: "secondary.main" }}>
                    {errors.confirm.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>
        <Grid item>
          <CommonButton type="submit">
            <Typography
              component="span"
              sx={{
                color: "#fff",
                textTransform: "capitalize",
                px: 2.8,
                py: 0.8,
              }}
            >
              {mutation.isPending ? "Updating..." : "Update Password"}
            </Typography>
          </CommonButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserPasswordUpdateForm;
