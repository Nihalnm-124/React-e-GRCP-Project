import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

const initialState = {
  title: "",
  requester: "",
  department: "",
  amount: "",
  priority: "Medium",
  status: "Pending",
  date: "",
};

function ApprovalDialog({
  open,
  onClose,
  selected,
  onSave,
}) {

  const [form, setForm] =
    useState(initialState);

  useEffect(() => {

    if (selected) {

      setForm({
        ...selected,
      });

    } else {

      setForm(initialState);

    }

  }, [selected, open]);

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? Number(value)
          : value,
    }));

  };

  const handleSubmit = () => {

    if (
      !form.title ||
      !form.requester ||
      !form.department ||
      !form.amount ||
      !form.date
    ) {
      return;
    }

    onSave(form);

  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle>

        {selected
          ? "Edit Approval"
          : "Add Approval"}

      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          mt={1}
        >

          <Grid item xs={12}>

            <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={6}>

            <TextField
              fullWidth
              label="Requester"
              name="requester"
              value={form.requester}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={6}>

            <TextField
              fullWidth
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={6}>

            <TextField
              fullWidth
              type="number"
              label="Amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={6}>

            <TextField
              select
              fullWidth
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >

              <MenuItem value="Low">
                Low
              </MenuItem>

              <MenuItem value="Medium">
                Medium
              </MenuItem>

              <MenuItem value="High">
                High
              </MenuItem>

              <MenuItem value="Critical">
                Critical
              </MenuItem>

            </TextField>

          </Grid>

          <Grid item xs={6}>

            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >

              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Approved">
                Approved
              </MenuItem>

              <MenuItem value="Rejected">
                Rejected
              </MenuItem>

              <MenuItem value="Escalated">
                Escalated
              </MenuItem>

            </TextField>

          </Grid>

          <Grid item xs={6}>

            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={form.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >

          {selected
            ? "Update"
            : "Save"}

        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default ApprovalDialog;