import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import RiskToolbar from "../../components/risk/RiskToolbar";
import RiskTable from "../../components/risk/RiskTable";
import RiskDialog from "../../components/risk/RiskDialog";

import RiskStatCard from "../../components/risk/RiskStatCard";
import RiskMatrix from "../../components/risk/RiskMatrix";
import RiskTrendChart from "../../components/risk/RiskTrendChart";
import RiskDistributionChart from "../../components/risk/RiskDistributionChart";
import RiskBarChart from "../../components/risk/RiskBarChart";
import RiskHeatMap from "../../components/risk/RiskHeatMap";

import {
  getRisks,
  searchRisks,
  filterSeverity,
  filterRiskStatus,
  addRisk,
  updateRisk,
} from "../../services/riskService";

function Risk() {
  const [loading, setLoading] =
    useState(true);

  const [risks, setRisks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [severity, setSeverity] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [selected, setSelected] =
    useState(null);

  const [snackbar, setSnackbar] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const data =
      await getRisks();

    setRisks(data);

    setLoading(false);
  }

  async function handleSearch(value) {
    setSearch(value);

    if (value.trim() === "") {
      loadData();
      return;
    }

    const data =
      await searchRisks(value);

    setRisks(data);
  }

  async function handleSeverity(value) {
    setSeverity(value);

    const data =
      await filterSeverity(value);

    setRisks(data);
  }

  async function handleStatus(value) {
    setStatus(value);

    const data =
      await filterRiskStatus(value);

    setRisks(data);
  }

  function handleAdd() {
    setSelected(null);
    setOpenDialog(true);
  }

  function handleEdit(risk) {
    setSelected(risk);
    setOpenDialog(true);
  }

  async function handleSave(data) {
    if (selected) {
      await updateRisk(
        selected.id,
        data
      );

      setMessage(
        "Risk updated successfully."
      );
    } else {
      await addRisk(data);

      setMessage(
        "Risk added successfully."
      );
    }

    setOpenDialog(false);

    setSnackbar(true);

    loadData();
  }

  function exportCSV() {
    const headers = [
      "Risk ID",
      "Title",
      "Owner",
      "Category",
      "Probability",
      "Impact",
      "Score",
      "Severity",
      "Status",
      "Due Date",
    ];

    const csvRows = risks.map((risk) => [
      risk.id,
      risk.title,
      risk.owner,
      risk.category,
      risk.probability,
      risk.impact,
      risk.score,
      risk.severity,
      risk.status,
      risk.dueDate,
    ]);

    const csv =
      "\uFEFF" +
      [headers, ...csvRows]
        .map((row) =>
          row.map((v) => `"${v}"`).join(",")
        )
        .join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "risks.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  const totalRisks =
    risks.length;

  const highRisks =
    risks.filter(
      (r) => r.severity === "High"
    ).length;

  const mediumRisks =
    risks.filter(
      (r) => r.severity === "Medium"
    ).length;

  const closedRisks =
    risks.filter(
      (r) => r.status === "Closed"
    ).length;

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Risk Center
      </Typography>

      <Grid
        container
        spacing={3}
        mb={3}
      >
        <Grid item xs={12} sm={6} lg={3}>
          <RiskStatCard
            title="Total Risks"
            value={totalRisks}
            icon={<WarningAmberIcon />}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <RiskStatCard
            title="High Risks"
            value={highRisks}
            icon={<ErrorIcon />}
            color="#d32f2f"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <RiskStatCard
            title="Medium Risks"
            value={mediumRisks}
            icon={<ReportProblemIcon />}
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <RiskStatCard
            title="Closed Risks"
            value={closedRisks}
            icon={<CheckCircleIcon />}
            color="#2e7d32"
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        mb={3}
      >
        <Grid item xs={12} lg={6}>
          <RiskMatrix />
        </Grid>

        <Grid item xs={12} lg={6}>
          <RiskTrendChart />
        </Grid>

        <Grid item xs={12} lg={6}>
          <RiskDistributionChart />
        </Grid>

        <Grid item xs={12} lg={6}>
          <RiskBarChart />
        </Grid>

        <Grid item xs={12}>
          <RiskHeatMap />
        </Grid>
      </Grid>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <RiskToolbar
          search={search}
          severity={severity}
          status={status}
          onSearch={handleSearch}
          onSeverityChange={
            handleSeverity
          }
          onStatusChange={
            handleStatus
          }
          onAdd={handleAdd}
          onExport={exportCSV}
        />
      </Paper>

      {loading ? (
        <Skeleton
          variant="rounded"
          height={500}
        />
      ) : (
        <RiskTable
          rows={risks}
          refresh={loadData}
          onEdit={handleEdit}
        />
      )}

      <RiskDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        selected={selected}
        onSave={handleSave}
      />

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar(false)
        }
      >
        <Alert
          severity="success"
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>

    </Box>
  );
}

export default Risk;