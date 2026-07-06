import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  FormControlLabel,
  Switch,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

function NotificationSettings() {

  const [settings, setSettings] =
    useState({

      email: true,

      sms: false,

      push: true,

      auditAlerts: true,

      riskAlerts: true,

      weeklyReports: false,

    });

  const [snackbar, setSnackbar] =
    useState(false);

  const handleChange = (event) => {

    setSettings({

      ...settings,

      [event.target.name]:
        event.target.checked,

    });

  };

  const handleSave = () => {

    // API Integration Later

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

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          Notification Settings
        </Typography>

        <Divider sx={{ mb:4 }}/>

        <Grid
          container
          spacing={2}
        >

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.email}
                  onChange={handleChange}
                  name="email"
                />
              }
              label="Email Notifications"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.sms}
                  onChange={handleChange}
                  name="sms"
                />
              }
              label="SMS Notifications"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.push}
                  onChange={handleChange}
                  name="push"
                />
              }
              label="Push Notifications"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.auditAlerts}
                  onChange={handleChange}
                  name="auditAlerts"
                />
              }
              label="Audit Alerts"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.riskAlerts}
                  onChange={handleChange}
                  name="riskAlerts"
                />
              }
              label="Risk Alerts"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.weeklyReports}
                  onChange={handleChange}
                  name="weeklyReports"
                />
              }
              label="Weekly Reports"
            />

          </Grid>

          <Grid item xs={12}>

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
            >
              Save Preferences
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
          Notification preferences updated successfully.
        </Alert>

      </Snackbar>

    </Card>

  );

}

export default NotificationSettings;