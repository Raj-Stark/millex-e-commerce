"use client";
import CommonButton from "@/components/button";

import { Container, Grid, Typography, TextField } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

interface UserData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const UserDetailForm = () => {
  const getCurrentUserEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/getCurrentUser`;
  const updateUserEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/updateUser`;

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const response = await axios.get(getCurrentUserEndpoint, {
        withCredentials: true,
      });
      return response.data.user;
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserData>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("email", userData.email || "");
      setValue("address", userData?.address?.street || "");
      setValue("city", userData?.address?.city || "");
      setValue("state", userData?.address?.state || "");
      setValue("zip", userData?.address?.zip || "");
      setValue("country", userData?.address?.country || "");
    }
  }, [userData, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: UserData) => {
      const address = {
        street: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      };
      await axios.patch(
        updateUserEndpoint,
        { name: data.name, email: data.email, address },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update user details.");
    },
  });

  const onSubmit = (data: UserData) => {
    mutation.mutate(data);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading user data</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4 }}>
        User Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Recipient name is required" }}
              render={({ field }) => (
                <>
                  <TextField
                    variant="filled"
                    placeholder="Name"
                    {...field}
                    error={!!errors.name}
                    fullWidth
                    sx={{ "& .MuiFilledInput-input": { padding: 1.4 } }}
                  />
                  {errors.name && (
                    <Typography color="error">{errors.name.message}</Typography>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    variant="filled"
                    placeholder="Email"
                    {...field}
                    error={!!errors.email}
                    fullWidth
                    sx={{ "& .MuiFilledInput-input": { padding: 1.4 } }}
                  />
                  {errors.email && (
                    <Typography color="error">
                      {errors.email.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>

          {["address", "city", "state", "zip", "country"].map((fieldName) => (
            <Grid item xs={12} key={fieldName}>
              <Controller
                name={fieldName as keyof UserData}
                control={control}
                rules={{
                  required: `${
                    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                  } is required`,
                }}
                render={({ field }) => (
                  <>
                    <TextField
                      variant="filled"
                      placeholder={
                        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                      }
                      {...field}
                      error={!!errors[fieldName as keyof UserData]}
                      fullWidth
                      sx={{ "& .MuiFilledInput-input": { padding: 1.4 } }}
                    />
                    {errors[fieldName as keyof UserData] && (
                      <Typography color="error">
                        {errors[fieldName as keyof UserData]?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
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
                Update Details
              </Typography>
            </CommonButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserDetailForm;
