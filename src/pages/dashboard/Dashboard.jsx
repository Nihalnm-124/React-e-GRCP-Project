import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Skeleton,
  Paper,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import NotificationCard from "../../components/dashboard/NotificationCard";
import ActivityCard from "../../components/dashboard/ActivityCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentApprovals from "../../components/dashboard/RecentApprovals";
import ComplianceSummary from "../../components/dashboard/ComplianceSummary";
import TopRiskVendors from "../../components/dashboard/TopRiskVendors";

import { getDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const data = await getDashboard();
      setDashboard(data);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <Box>
        <Skeleton width={300} height={45} />
        <Skeleton width={450} height={25} />

        <Grid container spacing={3} mt={2}>
          {Array.from({ length: 7 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rounded"
                height={170}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 5,
          background:
            "linear-gradient(135deg,#2563eb,#1d4ed8,#3b82f6)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Executive Dashboard
        </Typography>

        <Typography mt={1}>
          Enterprise Governance, Risk,
          Compliance & Procurement
          Overview
        </Typography>
      </Paper>

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Requests"
            value={dashboard.stats.totalRequests}
            icon={<AssignmentIcon />}
            color="#2563eb"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            title="Pending Requests"
            value={dashboard.stats.pendingRequests}
            icon={<PendingActionsIcon />}
            color="#f59e0b"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            title="Approved Requests"
            value={dashboard.stats.approvedRequests}
            icon={<CheckCircleIcon />}
            color="#16a34a"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Rejected Requests"
            value={dashboard.stats.rejectedRequests}
            icon={<CancelIcon />}
            color="#dc2626"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Vendors"
            value={dashboard.stats.vendors}
            icon={<BusinessIcon />}
            color="#7c3aed"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Risks"
            value={dashboard.stats.risks}
            icon={<WarningAmberIcon />}
            color="#ea580c"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Compliance Issues"
            value={dashboard.stats.complianceIssues}
            icon={<VerifiedUserIcon />}
            color="#0891b2"
          />
        </Grid>

      </Grid>

      <Grid container spacing={3} mt={2}>

        <Grid item xs={12} lg={8}>
          <ChartCard
            data={dashboard.chart}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <NotificationCard
            notifications={dashboard.notifications}
          />
        </Grid>

      </Grid>

      <Grid container spacing={3} mt={2}>

        <Grid item xs={12} md={6}>
          <QuickActions />
        </Grid>

        <Grid item xs={12} md={6}>
          <RecentApprovals />
        </Grid>

        <Grid item xs={12} md={6}>
          <ComplianceSummary />
        </Grid>

        <Grid item xs={12} md={6}>
          <TopRiskVendors />
        </Grid>

      </Grid>

      <Grid container spacing={3} mt={2}>

        <Grid item xs={12}>
          <ActivityCard
            activities={dashboard.activities}
          />
        </Grid>

      </Grid>

    </Box>
  );
}

export default Dashboard;