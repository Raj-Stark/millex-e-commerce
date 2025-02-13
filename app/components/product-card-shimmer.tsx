import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 350,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton
          variant="rectangular"
          height={250}
          width="100%"
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ paddingBottom: "0px !important" }}>
          <Typography variant="h6">
            <Skeleton width="80%" />
          </Typography>
        </CardContent>
      </Box>

      <Box>
        <CardContent>
          <Grid>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={1}
              gap={1}
            >
              <Skeleton width="50px" height={20} />
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Skeleton variant="rounded" width={80} height={20} />
              </Box>
            </Box>
          </Grid>
        </CardContent>

        <CardActions>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductCardSkeleton;
