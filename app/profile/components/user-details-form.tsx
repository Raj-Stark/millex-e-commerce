"use client";
import CommonButton from "@/components/button";
import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

const UserDetailsForm = () => {
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
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("email", userData.email || "");
      setValue("street", userData?.address?.street || "");
      setValue("city", userData?.address?.city || "");
      setValue("state", userData?.address?.state || "");
      setValue("zip", userData?.address?.zip || "");
      setValue("country", userData?.address?.country || "");
      setValue("phone", userData?.phone || "");
    }
  }, [userData, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const address = {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      };
      await axios.patch(
        updateUserEndpoint,
        { name: data.name, email: data.email, phone: data.phone, address },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("User successfully updated !!!");
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
    mutation.mutate(data);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading user data</Typography>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columns={{ xs: 1, lg: 2 }} columnSpacing={8} rowSpacing={4}>
        <Grid item xs={1}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <>
                <TextField
                  variant="filled"
                  placeholder="Name"
                  {...field}
                  error={!!errors.name}
                  sx={{
                    width: "100%",
                    "& .MuiFilledInput-input": {
                      padding: 1.4,
                    },
                  }}
                />
                {errors.name && (
                  <Typography component="span" sx={{ color: "secondary.main" }}>
                    {errors.name.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>

        <Grid item xs={1}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <>
                <TextField
                  variant="filled"
                  placeholder="E-mail"
                  {...field}
                  error={!!errors.email}
                  sx={{
                    width: "100%",
                    "& .MuiFilledInput-input": {
                      padding: 1.4,
                    },
                  }}
                />
                {errors.email && (
                  <Typography component="span" sx={{ color: "secondary.main" }}>
                    {errors.email.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>

        {["street", "city", "state", "zip", "country", "phone"].map(
          (fieldName) => (
            <Grid item xs={1} key={fieldName}>
              <Controller
                name={fieldName as keyof FormData}
                control={control}
                rules={{
                  required: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
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
                      error={!!errors[fieldName as keyof FormData]}
                      sx={{
                        width: "100%",
                        "& .MuiFilledInput-input": {
                          padding: 1.4,
                        },
                      }}
                    />
                    {errors[fieldName as keyof FormData] && (
                      <Typography
                        component="span"
                        sx={{ color: "secondary.main" }}
                      >
                        {errors[fieldName as keyof FormData]?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>
          )
        )}

        <Grid item xs={6}>
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
  );
};

export default UserDetailsForm;
