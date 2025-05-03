import SectionHeader from "@/components/section-header";
import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import UserDetailsForm from "./components/user-details-form";

import ProfileList from "./components/profile-list";

const ProfilePage = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader sectionTitle="Profile Page" sectionName="My Account" />
      <Grid
        mt={{ xs: 2, md: 4 }}
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 1, md: 2 }}
      >
        <Grid item xs={1} md={0.6} sx={{ height: "100%" }}>
          <Paper sx={{ height: "100%", padding: 2 }}>
            <ProfileList />
          </Paper>
        </Grid>

        <Grid item xs={1} md={1.4}>
          <Paper sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "medium",
                mb: 3,
                color: "secondary.main",
              }}
            >
              Edit Your Profile
            </Typography>
            <UserDetailsForm />

            <Divider sx={{ my: 4 }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
