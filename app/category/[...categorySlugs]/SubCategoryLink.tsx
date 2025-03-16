"use client";
import { Category } from "@/types/category-types";
import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SubCategoryLink({ category }: { category: Category }) {
  const pathname = usePathname();
  return <Link href={`${pathname}/${category.slug}`}>{category.name}</Link>;
}
