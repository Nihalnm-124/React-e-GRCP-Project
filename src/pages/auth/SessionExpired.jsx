import {
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import LockClockIcon from "@mui/icons-material/LockClock";

import { useNavigate } from "react-router-dom";

function SessionExpired() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: 450,
          textAlign: "center",
        }}
      >
        <LockClockIcon
          color="warning"
          sx={{
            fontSize: 70,
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Session Expired
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Your session has expired due to inactivity.
          Please login again to continue.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
}

export default SessionExpired;