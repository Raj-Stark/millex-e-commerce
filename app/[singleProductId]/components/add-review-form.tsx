"use client";
import CommonButton from "@/components/button";
import { Box, Rating, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  comment: string;
  rating: number;
}

interface Props {
  productId: string;
}

const AddReviewForm = ({ productId }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
    mode: "onBlur",
  });

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}review`;

      const response = await axios.post(
        endpoint,
        { productId: productId, comment: data.comment, rating: data.rating },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully");
      reset();
    },
    onError: () => {
      toast.error("Something went wrong !!");
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    submitReview(data);
  };

  return (
    <Box mt={10}>
      <form
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction={"column"} width={"100%"}>
          <Controller
            name="rating"
            control={control}
            rules={{
              required: "Please provide a rating",
              min: { value: 1, message: "Rating must be at least 1" },
              max: { value: 5, message: "Rating must be at most 5" },
            }}
            render={({ field }) => (
              <Rating
                {...field}
                name="rating"
                precision={0.5}
                defaultValue={0}
                onChange={(_, value) => field.onChange(value)}
                sx={{ mb: 2 }}
              />
            )}
          />
          {errors.rating && (
            <Typography component="span" sx={{ color: "secondary.main" }}>
              {errors.rating.message}
            </Typography>
          )}

          <Controller
            name="comment"
            control={control}
            rules={{
              required: "Please provide a comment",
              maxLength: {
                value: 800,
                message: "Comment cannot exceed 800 characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  sx={{ width: "100%" }}
                  {...field}
                  error={!!error}
                  placeholder="Write a comment !!"
                  multiline
                  maxRows={2}
                  variant="standard"
                />
                {errors.comment && (
                  <Typography component="span" sx={{ color: "secondary.main" }}>
                    {errors.comment.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Stack>

        <CommonButton
          type="submit"
          sx={{ width: "180px", px: 1, ml: 3 }}
          disabled={isPending}
        >
          <Typography sx={{ textTransform: "capitalize" }}>
            Submit Review
          </Typography>
        </CommonButton>
      </form>
    </Box>
  );
};

export default AddReviewForm;
