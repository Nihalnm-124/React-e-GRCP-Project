import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { Controller } from "react-hook-form";

function ProcurementForm({
  control,
  errors,
}) {
  return (
    <Grid
      container
      spacing={2}
      mt={1}
    >
      <Grid item xs={12}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Title"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="vendor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Vendor"
              error={!!errors.vendor}
              helperText={errors.vendor?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Department"
              error={!!errors.department}
              helperText={errors.department?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              label="Amount"
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Status"
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
            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="date"
              label="Date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default ProcurementForm;