import { formatCurrency } from "@/utils/format-currency";
import { Box, Input, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import { useForm } from "react-hook-form";

const SearchBar = () => {
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const router = useRouter();

  const searchValue = watch("search");
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchProducts", debouncedSearchValue],
    queryFn: async () => {
      if (!debouncedSearchValue?.trim()) return { products: [], msg: "" };
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product/searchProducts?keyword=${debouncedSearchValue}`;
      try {
        const response = await axios.get(endpoint);
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          throw new Error(err.response.data.msg || "No products found.");
        }
        throw new Error("An error occurred while fetching data.");
      }
    },
    enabled: Boolean(debouncedSearchValue),
  });

  return (
    <Box
      sx={{
        maxWidth: { xs: "90%", sm: "80%" },
        marginX: "auto",
      }}
    >
      <Input
        placeholder="What are you looking for?"
        type="text"
        {...register("search")}
        sx={{
          border: "1px solid #000",
          borderRadius: "5px",
          paddingX: 1,
          height: "40px",
          width: { xs: "100%", sm: "80%", md: "600px" },
          fontSize: { xs: "6px", sm: "14px" },
          "&::focus": {
            outline: "none",
          },
          "&::after": {
            border: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            border: "none",
          },
          "&::before": {
            borderBottom: "none",
          },
        }}
      />

      {debouncedSearchValue && (
        <Box
          sx={{
            position: "absolute",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            border: "1px solid #eaeaea",
          }}
        >
          {isLoading && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <CircularProgress size={20} />
            </Box>
          )}

          {error && (
            <Box sx={{ p: 2 }}>
              <Typography color="error">{error.message}</Typography>
            </Box>
          )}

          {data?.msg && debouncedSearchValue && !isLoading && (
            <Box sx={{ p: 2 }}>
              <Typography fontSize={"14px"} fontWeight={400}>
                {data?.msg}
              </Typography>
            </Box>
          )}

          {data?.products &&
            data.products.map((product: any, index: number) => (
              <Box
                key={index}
                sx={{
                  p: 1.5,
                  borderBottom: "1px solid #eaeaea",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
                onClick={() => {
                  router.push(`/${product._id}`);
                }}
              >
                <Box
                  component="img"
                  src={product.image || "/placeholder-image.jpg"}
                  alt={product.name}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />

                <Box>
                  <Typography fontWeight="500">{product.name}</Typography>
                  <Typography color="text.secondary" fontSize="14px">
                    {formatCurrency(product.price)}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
