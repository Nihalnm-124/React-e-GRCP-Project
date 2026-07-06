import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

import SettingsTabs from "../../components/settings/SettingsTabs";

function Settings() {
  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Settings
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <SettingsTabs />
      </Paper>

    </Box>
  );
}

export default Settings;