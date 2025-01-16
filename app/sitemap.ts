import { DOMAIN_NAME } from "@/constants";
import { Category } from "@/types/category-types";
import { ProductType } from "@/types/product-types";
import axios from "axios";
import type { MetadataRoute } from "next";

const baseRoute = DOMAIN_NAME;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    data: { products },
  } = await axios.get<{ products: ProductType[] }>(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}product`,
  );

  const {
    data: { categories },
  } = await axios.get<{ categories: Category[] }>(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}category`,
  );

  const productsSiteMap = products.map((product) => {
    return {
      url: `${baseRoute}/${product._id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  const categoriesSiteMap = categories.map((category) => {
    return {
      url: `${baseRoute}/ItemByCategory/${category._id}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    };
  });

  return [
    {
      url: `${baseRoute}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...productsSiteMap,
    ...categoriesSiteMap,
  ];
}
