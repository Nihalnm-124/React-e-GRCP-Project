import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { Controller } from "react-hook-form";

function AuditForm({
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
          name="auditName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Audit Name"
              error={!!errors.auditName}
              helperText={
                errors.auditName?.message
              }
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="auditor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Auditor"
              error={!!errors.auditor}
              helperText={
                errors.auditor?.message
              }
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
              helperText={
                errors.department?.message
              }
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Priority"
            >
              <MenuItem value="Critical">
                Critical
              </MenuItem>

              <MenuItem value="High">
                High
              </MenuItem>

              <MenuItem value="Medium">
                Medium
              </MenuItem>

              <MenuItem value="Low">
                Low
              </MenuItem>

            </TextField>
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
              <MenuItem value="Scheduled">
                Scheduled
              </MenuItem>

              <MenuItem value="In Progress">
                In Progress
              </MenuItem>

              <MenuItem value="Completed">
                Completed
              </MenuItem>

            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.startDate}
              helperText={
                errors.startDate?.message
              }
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="date"
              label="End Date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.endDate}
              helperText={
                errors.endDate?.message
              }
            />
          )}
        />
      </Grid>

    </Grid>
  );
}

export default AuditForm;