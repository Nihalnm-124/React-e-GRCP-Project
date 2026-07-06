import { Box, Paper, Typography } from "@mui/material";
import Logo from "../components/common/Logo";

function AuthLayout({ title, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 450,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Logo />

        <Typography
          variant="h5"
          align="center"
          sx={{ mt: 2, mb: 3 }}
        >
          {title}
        </Typography>

        {children}
      </Paper>
    </Box>
  );
}

export default AuthLayout;