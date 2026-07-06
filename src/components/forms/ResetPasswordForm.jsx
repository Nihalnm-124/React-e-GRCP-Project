import {
  Button,
  Stack,
  TextField
} from "@mui/material";

function ResetPasswordForm() {
  return (
    <Stack spacing={3}>
      <TextField
        label="New Password"
        type="password"
        fullWidth
      />

      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
      />

      <Button
        variant="contained"
        fullWidth
      >
        Reset Password
      </Button>
    </Stack>
  );
}

export default ResetPasswordForm;