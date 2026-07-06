import {
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

function ComplianceToolbar({
  search,
  status,
  framework,
  onSearch,
  onStatusChange,
  onFrameworkChange,
  onAdd,
  onExport,
}) {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Search Compliance"
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          select
          label="Framework"
          value={framework}
          onChange={(e) =>
            onFrameworkChange(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="ISO 27001">
            ISO 27001
          </MenuItem>

          <MenuItem value="ISO 22301">
            ISO 22301
          </MenuItem>

          <MenuItem value="ISO 27017">
            ISO 27017
          </MenuItem>

          <MenuItem value="ISO 27701">
            ISO 27701
          </MenuItem>

          <MenuItem value="SOC 2">
            SOC 2
          </MenuItem>

          <MenuItem value="GDPR">
            GDPR
          </MenuItem>

          <MenuItem value="PCI DSS">
            PCI DSS
          </MenuItem>

          <MenuItem value="HIPAA">
            HIPAA
          </MenuItem>

          <MenuItem value="NIST">
            NIST
          </MenuItem>

          <MenuItem value="CIS">
            CIS
          </MenuItem>

        </TextField>
      </Grid>

      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          select
          label="Status"
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

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
      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        justifyContent="flex-end"
        gap={2}
      >
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onExport}
        >
          Export CSV
        </Button>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Add Compliance
        </Button>
      </Grid>

    </Grid>
  );
}

export default ComplianceToolbar;