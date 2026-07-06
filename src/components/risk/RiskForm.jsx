import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { Controller } from "react-hook-form";

function RiskForm({
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
              label="Risk Title"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="owner"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Owner"
              error={!!errors.owner}
              helperText={errors.owner?.message}
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
          name="probability"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Probability"
            >
              {[1,2,3,4,5].map((v)=>(
                <MenuItem
                  key={v}
                  value={v}
                >
                  {v}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="impact"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Impact"
            >
              {[1,2,3,4,5].map((v)=>(
                <MenuItem
                  key={v}
                  value={v}
                >
                  {v}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="severity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Severity"
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
              <MenuItem value="Open">
                Open
              </MenuItem>

              <MenuItem value="Mitigated">
                Mitigated
              </MenuItem>

              <MenuItem value="Closed">
                Closed
              </MenuItem>

            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="date"
              label="Due Date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
            />
          )}
        />
      </Grid>

    </Grid>
  );
}

export default RiskForm;