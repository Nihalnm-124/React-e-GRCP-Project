import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2">
        © 2026 e-GRCP. All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;