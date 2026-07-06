import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { Controller } from "react-hook-form";

function ComplianceForm({
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
          name="policy"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Policy Name"
              error={!!errors.policy}
              helperText={errors.policy?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="control"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Control"
              error={!!errors.control}
              helperText={errors.control?.message}
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
          name="framework"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Framework"
            >
              <MenuItem value="ISO 27001">ISO 27001</MenuItem>
              <MenuItem value="ISO 22301">ISO 22301</MenuItem>
              <MenuItem value="ISO 27017">ISO 27017</MenuItem>
              <MenuItem value="ISO 27701">ISO 27701</MenuItem>
              <MenuItem value="SOC 2">SOC 2</MenuItem>
              <MenuItem value="GDPR">GDPR</MenuItem>
              <MenuItem value="PCI DSS">PCI DSS</MenuItem>
              <MenuItem value="HIPAA">HIPAA</MenuItem>
              <MenuItem value="NIST">NIST</MenuItem>
              <MenuItem value="CIS">CIS</MenuItem>
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
              <MenuItem value="Compliant">
                Compliant
              </MenuItem>

              <MenuItem value="In Review">
                In Review
              </MenuItem>

              <MenuItem value="Non-Compliant">
                Non-Compliant
              </MenuItem>

            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="reviewDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="date"
              label="Review Date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.reviewDate}
              helperText={
                errors.reviewDate?.message
              }
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="evidence"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Evidence File"
              placeholder="example.pdf"
              error={!!errors.evidence}
              helperText={
                errors.evidence?.message
              }
            />
          )}
        />
      </Grid>

    </Grid>
  );
}

export default ComplianceForm;