import {
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

function ReportsToolbar({
  search,
  status,
  type,
  onSearch,
  onStatusChange,
  onTypeChange,
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
          label="Search Report"
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
          label="Status"
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Generated">
            Generated
          </MenuItem>

          <MenuItem value="Scheduled">
            Scheduled
          </MenuItem>

          <MenuItem value="Failed">
            Failed
          </MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          select
          label="Type"
          value={type}
          onChange={(e) =>
            onTypeChange(e.target.value)
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Risk">
            Risk
          </MenuItem>

          <MenuItem value="Vendor">
            Vendor
          </MenuItem>

          <MenuItem value="Compliance">
            Compliance
          </MenuItem>

          <MenuItem value="Audit">
            Audit
          </MenuItem>

          <MenuItem value="Security">
            Security
          </MenuItem>

          <MenuItem value="Procurement">
            Procurement
          </MenuItem>

          <MenuItem value="Finance">
            Finance
          </MenuItem>

          <MenuItem value="Privacy">
            Privacy
          </MenuItem>

          <MenuItem value="Infrastructure">
            Infrastructure
          </MenuItem>

          <MenuItem value="Executive">
            Executive
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
          Add Report
        </Button>
      </Grid>
    </Grid>
  );
}

export default ReportsToolbar;