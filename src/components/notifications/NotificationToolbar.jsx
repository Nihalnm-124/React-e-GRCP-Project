import {
  Grid,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

function NotificationToolbar({
  search,
  priority,
  status,
  onSearch,
  onPriorityChange,
  onStatusChange,
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
          placeholder="Search Notification"
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

      <Grid item xs={12} md={2}>

        <TextField
          select
          fullWidth
          label="Priority"
          value={priority}
          onChange={(e) =>
            onPriorityChange(
              e.target.value
            )
          }
        >
          <MenuItem value="All">
            All
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

          <MenuItem value="Read">
            Read
          </MenuItem>

          <MenuItem value="Unread">
            Unread
          </MenuItem>

        </TextField>

      </Grid>

      <Grid item xs={12} md={4}>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <DownloadIcon />
          }
          onClick={onExport}
          sx={{
            height: 56,
          }}
        >
          Export CSV
        </Button>

      </Grid>

    </Grid>
  );
}

export default NotificationToolbar;