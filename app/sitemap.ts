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

  let categoryRoutes: string[] = [];

  async function getAllCategoryRoutes(
    parentCategory: Category | null,
    parentRoute: string,
  ) {
    let url = `${process.env.NEXT_PUBLIC_LOCAL_URL}category`;
    if (parentCategory) {
      url = url + `/${[parentCategory.slug]}`;
    }
    const {
      data: { categories },
    } = await axios.get<{ categories: Category[] }>(url);

    categoryRoutes = [
      ...categoryRoutes,
      ...categories.map((category) => {
        if (parentRoute) {
          return `${baseRoute}/category/${parentRoute}${category.slug}`;
        } else {
          return `${baseRoute}/category/${category.slug}`;
        }
      }),
    ];
    for (const category of categories) {
      await getAllCategoryRoutes(category, `${parentRoute}${category.slug}/`);
    }
  }

  await getAllCategoryRoutes(null, "");

  const productsSiteMap = products.map((product) => {
    return {
      url: `${baseRoute}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  const categoriesSiteMap = categoryRoutes.map((category) => {
    return {
      url: category,
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
