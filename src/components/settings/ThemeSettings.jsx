import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  FormControlLabel,
  Switch,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

function ThemeSettings() {

  const [theme, setTheme] =
    useState({

      darkMode: false,

      compactMode: false,

      primaryColor: "#1976d2",

      fontSize: "Medium",

    });

  const [snackbar, setSnackbar] =
    useState(false);

  const handleSwitch = (e) => {

    setTheme({

      ...theme,

      [e.target.name]:
        e.target.checked,

    });

  };

  const handleChange = (e) => {

    setTheme({

      ...theme,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSave = () => {

    // Backend Integration Later

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
          Theme Settings
        </Typography>

        <Divider sx={{ mb:4 }}/>

        <Grid
          container
          spacing={3}
        >

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={theme.darkMode}
                  onChange={handleSwitch}
                  name="darkMode"
                />
              }
              label="Enable Dark Mode"
            />

          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={
                <Switch
                  checked={theme.compactMode}
                  onChange={handleSwitch}
                  name="compactMode"
                />
              }
              label="Enable Compact Mode"
            />

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >

            <TextField
              fullWidth
              label="Primary Color"
              name="primaryColor"
              type="color"
              value={theme.primaryColor}
              onChange={handleChange}
              InputLabelProps={{
                shrink:true,
              }}
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
              label="Font Size"
              name="fontSize"
              value={theme.fontSize}
              onChange={handleChange}
            >

              <MenuItem value="Small">
                Small
              </MenuItem>

              <MenuItem value="Medium">
                Medium
              </MenuItem>

              <MenuItem value="Large">
                Large
              </MenuItem>

            </TextField>

          </Grid>

          <Grid item xs={12}>

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              mb={2}
            >
              Preview
            </Typography>

            <Paper
              elevation={3}
              sx={{
                p:3,
                borderRadius:3,
                backgroundColor:
                  theme.darkMode
                    ? "#1e1e1e"
                    : "#ffffff",

                color:
                  theme.darkMode
                    ? "#ffffff"
                    : "#000000",

                borderLeft:`6px solid ${theme.primaryColor}`,
              }}
            >

              <Typography
                variant={
                  theme.fontSize==="Small"
                    ?"body2"
                    :theme.fontSize==="Large"
                    ?"h6"
                    :"body1"
                }
              >
                This is a preview of your selected theme.
              </Typography>

            </Paper>

          </Grid>

          <Grid item xs={12}>

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
            >
              Save Theme
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
          Theme settings updated successfully.
        </Alert>

      </Snackbar>

    </Card>

  );

}

export default ThemeSettings;