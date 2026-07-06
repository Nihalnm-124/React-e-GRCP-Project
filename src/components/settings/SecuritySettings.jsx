import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

function SecuritySettings() {

  const [security, setSecurity] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

      twoFactor: false,

      loginAlerts: true,

      sessionTimeout: true,

    });

  const [snackbar, setSnackbar] =
    useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setSecurity({

      ...security,

      [name]: value,

    });

  };

  const handleSwitch = (e) => {

    setSecurity({

      ...security,

      [e.target.name]:
        e.target.checked,

    });

  };

  const handleSave = () => {

    if (
      security.newPassword !==
      security.confirmPassword
    ) {

      alert("Passwords do not match");

      return;

    }

    // Backend Integration Later

    setSnackbar(true);

    setSecurity({

      ...security,

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  };

  return (

    <Card
      elevation={2}
      sx={{
        borderRadius:3,
      }}
    >

      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          Security Settings
        </Typography>

        <Divider sx={{ mb:4 }}/>

        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            xs={12}
          >

            <TextField
              fullWidth
              type="password"
              label="Current Password"
              name="currentPassword"
              value={security.currentPassword}
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
              type="password"
              label="New Password"
              name="newPassword"
              value={security.newPassword}
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
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={security.confirmPassword}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={security.twoFactor}
                  onChange={handleSwitch}
                  name="twoFactor"
                />
              }
              label="Enable Two-Factor Authentication"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={security.loginAlerts}
                  onChange={handleSwitch}
                  name="loginAlerts"
                />
              }
              label="Login Alerts"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={security.sessionTimeout}
                  onChange={handleSwitch}
                  name="sessionTimeout"
                />
              }
              label="Auto Session Timeout"
            />

          </Grid>

          <Grid item xs={12}>

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
            >
              Update Security
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
          Security settings updated successfully.
        </Alert>

      </Snackbar>

    </Card>

  );

}

export default SecuritySettings;