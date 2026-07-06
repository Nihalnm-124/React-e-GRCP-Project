import {
  Grid,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ErrorIcon from "@mui/icons-material/Error";

import StatCard from "../dashboard/StatCard";

function ReportCards({ stats }) {

  if (!stats) return null;

  return (

    <Grid
      container
      spacing={3}
      mb={3}
    >

      <Grid
        item
        xs={12}
        sm={6}
        md={3}
      >
        <StatCard
          title="Total Reports"
          value={stats.total}
          color="#1976d2"
          icon={<AssessmentIcon fontSize="inherit" />}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={3}
      >
        <StatCard
          title="Generated"
          value={stats.generated}
          color="#2e7d32"
          icon={<CheckCircleIcon fontSize="inherit" />}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={3}
      >
        <StatCard
          title="Scheduled"
          value={stats.scheduled}
          color="#ed6c02"
          icon={<ScheduleIcon fontSize="inherit" />}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={3}
      >
        <StatCard
          title="Failed"
          value={stats.failed}
          color="#d32f2f"
          icon={<ErrorIcon fontSize="inherit" />}
        />
      </Grid>

    </Grid>

  );

}

export default ReportCards;