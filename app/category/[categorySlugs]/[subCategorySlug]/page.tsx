import axios from "axios";
import { Container, Typography, Grid } from "@mui/material";
import SectionHeader from "@/components/section-header";
import ProductCard from "@/app/components/product-card";
import { ProductType } from "@/types/product-types";

interface SubcategoryPageProps {
  params: {
    subCategorySlug: string;
  };
}

async function getProductsBySlug(slug: string): Promise<ProductType[]> {
  try {
    const response = await axios.post<{ products: ProductType[] }>(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/filter`,
      {
        categorySlugs: [slug],
      },
    );
    return response.data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const SubcategoryPage = async ({ params }: SubcategoryPageProps) => {
  const { subCategorySlug } = params;

  let products: ProductType[] = [];
  let error: string | null = null;

  try {
    products = await getProductsBySlug(subCategorySlug);
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Typography color="error" textAlign="center">
          Something went wrong: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4, minHeight: "100vh" }}>
      <SectionHeader
        sectionTitle={subCategorySlug.replace(/-/g, " ").toUpperCase()}
        sectionName="Products"
      />

      <Grid
        container
        spacing={3}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        mt={2}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={1} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography mt={8} fontSize="20px" textAlign="center">
              No products found for this subcategory.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SubcategoryPage;
