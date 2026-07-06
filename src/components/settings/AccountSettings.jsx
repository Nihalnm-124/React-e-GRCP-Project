import { useState } from "react";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

function AccountSettings() {

  const [account, setAccount] =
    useState({

      username: "nihalnm",

      language: "English",

      timezone: "Asia/Kolkata",

      dateFormat: "DD/MM/YYYY",

    });

  const [snackbar, setSnackbar] =
    useState(false);

  const handleChange = (e) => {

    setAccount({

      ...account,

      [e.target.name]:
        e.target.value,

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
          Account Settings
        </Typography>

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
              label="Username"
              name="username"
              value={account.username}
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
              select
              label="Language"
              name="language"
              value={account.language}
              onChange={handleChange}
            >

              <MenuItem value="English">
                English
              </MenuItem>

              <MenuItem value="Hindi">
                Hindi
              </MenuItem>

              <MenuItem value="Kannada">
                Kannada
              </MenuItem>

            </TextField>

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >

            <TextField
              fullWidth
              select
              label="Time Zone"
              name="timezone"
              value={account.timezone}
              onChange={handleChange}
            >

              <MenuItem value="Asia/Kolkata">
                Asia/Kolkata
              </MenuItem>

              <MenuItem value="UTC">
                UTC
              </MenuItem>

              <MenuItem value="America/New_York">
                America/New_York
              </MenuItem>

              <MenuItem value="Europe/London">
                Europe/London
              </MenuItem>

            </TextField>

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >

            <TextField
              fullWidth
              select
              label="Date Format"
              name="dateFormat"
              value={account.dateFormat}
              onChange={handleChange}
            >

              <MenuItem value="DD/MM/YYYY">
                DD/MM/YYYY
              </MenuItem>

              <MenuItem value="MM/DD/YYYY">
                MM/DD/YYYY
              </MenuItem>

              <MenuItem value="YYYY-MM-DD">
                YYYY-MM-DD
              </MenuItem>

            </TextField>

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
              Save Settings
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
          Account settings updated successfully.
        </Alert>

      </Snackbar>

    </Card>

  );

}

export default AccountSettings;