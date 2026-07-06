import {
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

function AuditToolbar({
  search,
  status,
  auditor,
  onSearch,
  onStatusChange,
  onAuditorChange,
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
          label="Search Audit"
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
            onStatusChange(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

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
      </Grid>

      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          select
          label="Auditor"
          value={auditor}
          onChange={(e) =>
            onAuditorChange(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="John Smith">
            John Smith
          </MenuItem>

          <MenuItem value="Alice Brown">
            Alice Brown
          </MenuItem>

          <MenuItem value="David Wilson">
            David Wilson
          </MenuItem>

          <MenuItem value="Jennifer Lee">
            Jennifer Lee
          </MenuItem>

          <MenuItem value="Michael Scott">
            Michael Scott
          </MenuItem>

          <MenuItem value="Sophia Davis">
            Sophia Davis
          </MenuItem>

          <MenuItem value="Robert Taylor">
            Robert Taylor
          </MenuItem>

          <MenuItem value="Emma Johnson">
            Emma Johnson
          </MenuItem>

          <MenuItem value="Chris Evans">
            Chris Evans
          </MenuItem>

          <MenuItem value="Olivia Martin">
            Olivia Martin
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
          Add Audit
        </Button>
      </Grid>

    </Grid>
  );
}

export default AuditToolbar;