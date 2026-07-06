import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { Controller } from "react-hook-form";

function VendorForm({
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
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Company Name"
              error={!!errors.company}
              helperText={errors.company?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="contact"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Contact Person"
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Phone"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Country"
              error={!!errors.country}
              helperText={errors.country?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Category"
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              label="Rating"
              inputProps={{
                min: 1,
                max: 5,
                step: 0.1,
              }}
              error={!!errors.rating}
              helperText={errors.rating?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="risk"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Risk Level"
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
              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Inactive">
                Inactive
              </MenuItem>

            </TextField>
          )}
        />
      </Grid>
    </Grid>
  );
}

export default VendorForm;