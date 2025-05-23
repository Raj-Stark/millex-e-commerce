import appTheme from "@/config/theme";
import { ProductType } from "@/types/product-types";
import { formatCurrency } from "@/utils/format-currency";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SearchResults = ({
  isLoading,
  error,
  data,
  debouncedSearchValue,
}: {
  isLoading: boolean;
  error: Error | null;
  data: any;
  debouncedSearchValue: string;
}) => {
  const router = useRouter();

  const matchesSMBreakpoint = useMediaQuery(appTheme.breakpoints.up("sm"));

  useEffect(() => {
    if (!matchesSMBreakpoint) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [matchesSMBreakpoint]);

  return (
    <Box
      sx={{
        position: { xs: "fixed", md: "absolute" },
        top: { xs: "56px", md: "45px" },
        left: "0px",
        width: "100%",
        height: { xs: "calc(100% - 56px)", md: "auto" },
        maxHeight: { xs: "100%", md: "400px" },
        overflowY: "auto",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 2000,
        border: "1px solid #eaeaea",
        // marginLeft: { xs: "20px" },
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
        data.products.map((product: ProductType, index: number) => (
          <Box
            key={index}
            sx={{
              p: 2,
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
              router.push(`/${product.slug}`);
            }}
          >
            <Image
              width={50}
              height={50}
              src={product && product?.images?.length ? product.images[0] : ""}
              alt={product.name}
              style={{
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
  );
};

export default SearchResults;
