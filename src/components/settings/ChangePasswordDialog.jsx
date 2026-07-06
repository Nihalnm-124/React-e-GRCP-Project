import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePasswordDialog({
  open,
  onClose,
  onSave,
}) {

  const [form, setForm] =
    useState(initialState);

  function handleChange(e) {

    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  function handleSubmit() {

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      return;
    }

    onSave(
      form.currentPassword,
      form.newPassword
    );

    setForm(initialState);

  }

  function handleClose() {

    setForm(initialState);

    onClose();

  }

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Change Password
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Current Password"
          type="password"
          name="currentPassword"
          value={
            form.currentPassword
          }
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          name="newPassword"
          value={
            form.newPassword
          }
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={
            form.confirmPassword
          }
          onChange={handleChange}
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Update Password
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default ChangePasswordDialog;