import {
  Grid,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

function ApprovalToolbar({
  search,
  status,
  onSearch,
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

      <Grid item xs={12} md={4}>

        <TextField
          fullWidth
          placeholder="Search Approval"
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

      </Grid>

      <Grid item xs={12} md={3}>

        <TextField
          select
          fullWidth
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

          <MenuItem value="Pending">
            Pending
          </MenuItem>

          <MenuItem value="Approved">
            Approved
          </MenuItem>

          <MenuItem value="Rejected">
            Rejected
          </MenuItem>

          <MenuItem value="Escalated">
            Escalated
          </MenuItem>

        </TextField>

      </Grid>

      <Grid item xs={12} md={2}>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onExport}
          sx={{
            height: 56,
          }}
        >
          Export CSV
        </Button>

      </Grid>

      <Grid item xs={12} md={3}>

        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{
            height: 56,
          }}
        >
          Add Approval
        </Button>

      </Grid>

    </Grid>
  );
}

export default ApprovalToolbar;