"use client";
import { Category } from "@/types/category-types";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubCategorySelect({
  subcategories,
}: {
  subcategories: Category[];
}) {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    // ✅ use correct type here
    const slug = event.target.value;
    setSelected(slug);
    router.push(`${window.location.pathname}/${slug}`);
  };

  return (
    <Select
      value={selected}
      onChange={handleChange}
      displayEmpty
      fullWidth
      sx={{ mb: 2 }}
    >
      <MenuItem value="" disabled>
        Select Subcategory
      </MenuItem>
      {subcategories.map((subcategory) => (
        <MenuItem key={subcategory.slug} value={subcategory.slug}>
          {subcategory.name}
        </MenuItem>
      ))}
    </Select>
  );
}
