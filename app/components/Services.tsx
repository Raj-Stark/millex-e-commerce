// components/ServicesSection.tsx
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ServicesSection: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={4} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box textAlign="center">
            <LocalShippingIcon style={{ fontSize: 40, color: "black" }} />
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              style={{ color: "black" }}
            >
              Free Fast Delivery
            </Typography>
            <Typography style={{ color: "black" }}>
              Enjoy our complimentary fast delivery service on all orders.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box textAlign="center">
            <AccessTimeIcon style={{ fontSize: 40, color: "black" }} />
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              style={{ color: "black" }}
            >
              24/7 Services
            </Typography>
            <Typography style={{ color: "black" }}>
              Our support team is available 24/7 to assist you with any queries.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box textAlign="center">
            <AttachMoneyIcon style={{ fontSize: 40, color: "black" }} />
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              style={{ color: "black" }}
            >
              Money Back Guarantee
            </Typography>
            <Typography style={{ color: "black" }}>
              We offer a money-back guarantee for a hassle-free shopping
              experience.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServicesSection;
