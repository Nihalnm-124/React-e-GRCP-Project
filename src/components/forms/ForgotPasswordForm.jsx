import {
  Button,
  Stack,
  TextField
} from "@mui/material";

function ForgotPasswordForm() {
  return (
    <Stack spacing={3}>
      <TextField
        label="Email"
        fullWidth
      />

      <Button
        variant="contained"
        fullWidth
      >
        Send Reset Link
      </Button>
    </Stack>
  );
}

export default ForgotPasswordForm;