import {
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

function RiskToolbar({
  search,
  severity,
  status,
  onSearch,
  onSeverityChange,
  onStatusChange,
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
          label="Search Risk"
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
          label="Severity"
          value={severity}
          onChange={(e) =>
            onSeverityChange(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

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
          Add Risk
        </Button>
      </Grid>

    </Grid>
  );
}

export default RiskToolbar;