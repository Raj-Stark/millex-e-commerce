import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import AddToCartSection from "./components/add-to-cart-section";
import AddReviewForm from "./components/add-review-form";
import ReviewList from "./components/review-list";
import { formatCurrency } from "@/utils/format-currency";
import { ProductType } from "@/types/product-types";
import { Review } from "@/types/review-types";
import ProductRatings from "./components/product-ratings";
import { Marked } from "marked";
import ImageSlideShow from "./components/image-slide-show";
import { Metadata } from "next";
import { truncateTextWithEllipsis } from "@/utils";
import { DOMAIN_NAME } from "@/constants";

const marked = new Marked({
  gfm: true,
  breaks: true,
});

interface SingleProductPageProps {
  params: {
    singleProductSlug: string;
  };
}

export interface SingleProductType extends ProductType {
  reviews: Review[];
}

async function getProductById(
  singleProductSlug: string,
): Promise<SingleProductType | null> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/${singleProductSlug}`,
    );
    return response.data.product;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function generateMetadata({
  params,
}: SingleProductPageProps): Promise<Metadata> {
  const id = params.singleProductSlug;
  const product = await getProductById(id);

  if (!product) return {};

  const parsedDescription = await marked.parse(product.description);

  const plainTextDescription = truncateTextWithEllipsis(
    decodeHTMLEntities(
      parsedDescription
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\n/g, " ")
        .trim(),
    ),
    150,
  );

  return {
    title: product.name,
    openGraph: {
      title: product.name,
      description: plainTextDescription,
      url: DOMAIN_NAME,
      images: product.images.map((image) => ({
        url: image,
        height: 630,
        width: 1200,
        alt: `${product.name} image`,
      })),
    },
  };
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { singleProductSlug } = params;

  let product: SingleProductType | null = null;
  let error: string | null = null;

  try {
    product = await getProductById(singleProductSlug);
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  if (error) {
    return <Typography sx={{ m: 4 }}>Something went wrong: {error}</Typography>;
  }

  if (!product) {
    return <Typography sx={{ m: 4 }}>Product not found.</Typography>;
  }

  const htmlDescription = await marked.parse(product.description);

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        mb: 10,
      }}
    >
      <Grid
        container
        columns={{ xs: 1, lg: 2.5 }}
        columnSpacing={{ xs: 4, lg: 8 }}
        mt={{ xs: 4, md: 12 }}
        rowSpacing={{ xs: 2, lg: 0 }}
      >
        <Grid item xs={1}>
          <ImageSlideShow images={product.images} />
        </Grid>

        <Grid item xs={1} lg={1.5}>
          <Typography fontWeight="bold" fontSize={{ xs: 20, sm: 24 }}>
            {product.name}
          </Typography>

          <Box
            display="flex"
            justifyContent="flex-start"
            mt={2}
            alignItems="center"
          >
            <ProductRatings rating={product.averageRating} />
            <Typography fontSize={{ xs: 12, sm: 16 }} sx={{ ml: 1 }}>
              {`${product.numOfReviews} reviews`}
            </Typography>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ border: "1px solid red", mx: { xs: 1, sm: 3 } }}
            />

            <Typography
              sx={{
                color: product.inventory !== 0 ? "#00FF66" : "#F43F5E",
                fontSize: { xs: 12, sm: 16 },
              }}
            >
              {product.inventory === 0 ? "Out Of Stock" : "In Stock"}
            </Typography>
          </Box>

          <Typography mt={2} fontSize={{ xs: "20px", sm: "24px" }} variant="h6">
            {formatCurrency(product.price)}
          </Typography>

          <Box
            mt={2}
            sx={{
              "& ul": { my: 0 },
              "& h4": { my: 1 },
            }}
            dangerouslySetInnerHTML={{ __html: htmlDescription }}
          />

          <Divider sx={{ mt: { xs: 2, md: 4 } }} />
          <AddToCartSection item={product} />
        </Grid>
      </Grid>

      <Divider sx={{ mt: { xs: 4, md: 8 } }} />
      <AddReviewForm productId={product._id} />
      <ReviewList reviews={product.reviews} />
    </Container>
  );
};

export default SingleProductPage;
