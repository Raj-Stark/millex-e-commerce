import { Box, Input } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import { useForm } from "react-hook-form";
import SearchResults from "./search-results";


const SearchBar = () => {
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });
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
    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
      <Box sx={{
        width: "100%",
        maxWidth: "800px",
        position: { xs: 'static', md: 'relative' },
        display: "flex",
      }}>
        <Input
          placeholder="What are you looking for?"
          type="text"
          {...register("search")}
          sx={{
            border: "1px solid #000",
            flexGrow: 1,
            borderRadius: "3px",
            paddingX: 1,
            marginRight: { xs: "0px", md: "20px" },
            marginLeft: { xs: "20px" },
            height: { xs: "35px", lg: "40px" },
            fontSize: { xs: "12px", sm: "14px" },
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

        {debouncedSearchValue &&
          <SearchResults
            isLoading={isLoading}
            error={error}
            data={data}
            debouncedSearchValue={debouncedSearchValue}
          />
        }
      </Box>
    </Box>
  );
};

export default SearchBar;
