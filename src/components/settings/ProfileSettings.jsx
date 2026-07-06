import { useState } from "react";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Stack,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

function ProfileSettings() {

  const [profile, setProfile] =
    useState({
      fullName: "Nihal N M",
      email: "nihal@example.com",
      phone: "+91 9876543210",
      department: "Information Security",
      designation: "GRC Analyst",
    });

  const [snackbar, setSnackbar] =
    useState(false);

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSave = () => {

    // Backend/API integration later

    setSnackbar(true);

  };

  return (

    <Card
      elevation={2}
      sx={{
        borderRadius:3,
      }}
    >

      <CardContent>

        <Stack
          alignItems="center"
          spacing={2}
          mb={4}
        >

          <Avatar
            sx={{
              width:90,
              height:90,
              bgcolor:"primary.main",
            }}
          >

            <PersonIcon
              sx={{
                fontSize:50,
              }}
            />

          </Avatar>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Profile Information
          </Typography>

        </Stack>

        <Divider sx={{ mb:4 }}/>

        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            xs={12}
            md={6}
          >

            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
            />

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >

            <TextField
              fullWidth
              label="Department"
              name="department"
              value={profile.department}
              onChange={handleChange}
            />

          </Grid>

          <Grid
            item
            xs={12}
          >

            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={profile.designation}
              onChange={handleChange}
            />

          </Grid>

          <Grid
            item
            xs={12}
          >

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
            >
              Save Changes
            </Button>

          </Grid>

        </Grid>

      </CardContent>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar(false)
        }
      >

        <Alert
          severity="success"
          variant="filled"
        >
          Profile updated successfully.
        </Alert>

      </Snackbar>

    </Card>

  );

}

export default ProfileSettings;