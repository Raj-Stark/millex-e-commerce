import SectionHeader from "@/components/section-header";
import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import UserDetailsForm from "./components/user-details-form";
import UserPasswordUpdateForm from "./components/user-password-update-form";

import ProfileList from "./components/profile-list";

const ProfilePage = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader sectionTitle="Profile Page" sectionName="My Account" />

      <Grid mt={6} container columnSpacing={6}>
        <Grid item xs={4} sx={{ height: "100%" }}>
          <Paper sx={{ height: "100%", padding: 2 }}>
            <ProfileList />
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper sx={{ padding: 4 }}>
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

            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "medium",
                mb: 3,
                color: "secondary.main",
              }}
            >
              Update Your Password
            </Typography>
            <UserPasswordUpdateForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
