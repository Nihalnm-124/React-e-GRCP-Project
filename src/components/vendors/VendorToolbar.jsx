import {
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

function VendorToolbar({
  search,
  status,
  risk,
  onSearch,
  onStatusChange,
  onRiskChange,
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
          label="Search Vendor"
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
      </Grid>

      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          select
          label="Risk"
          value={risk}
          onChange={(e) =>
            onRiskChange(e.target.value)
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

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
          Add Vendor
        </Button>
      </Grid>

    </Grid>
  );
}

export default VendorToolbar;