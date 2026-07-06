import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const initialState = {
  name: "",
  type: "Procurement",
};

function SaveReportDialog({
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

    if (!form.name.trim())
      return;

    onSave(form);

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
        Save Report
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Report Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Report Type"
          name="type"
          value={form.type}
          onChange={handleChange}
        >

          <MenuItem value="Procurement">
            Procurement
          </MenuItem>

          <MenuItem value="Vendor">
            Vendor
          </MenuItem>

          <MenuItem value="Risk">
            Risk
          </MenuItem>

          <MenuItem value="Compliance">
            Compliance
          </MenuItem>

          <MenuItem value="Audit">
            Audit
          </MenuItem>

        </TextField>

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
          Save
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default SaveReportDialog;