import { DOMAIN_NAME } from "@/constants";
import axios from "axios";
import type { MetadataRoute } from "next";

const baseRoute = DOMAIN_NAME;

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseRoute}/sitemap.xml`,
  };
}
