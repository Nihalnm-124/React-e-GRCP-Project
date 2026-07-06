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

import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import AuditToolbar from "../../components/audit/AuditToolbar";
import AuditTable from "../../components/audit/AuditTable";
import AuditDialog from "../../components/audit/AuditDialog";

import AuditStatCard from "../../components/audit/AuditStatCard";
import AuditHistory from "../../components/audit/AuditHistory";
import AuditReports from "../../components/audit/AuditReports";
import UserActivities from "../../components/audit/UserActivities";
import SystemLogs from "../../components/audit/SystemLogs";

import {
  getAudits,
  searchAudits,
  filterAuditStatus,
  filterAuditor,
  addAudit,
  updateAudit,
} from "../../services/auditService";

function Audit() {
  const [loading, setLoading] =
    useState(true);

  const [audits, setAudits] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [auditor, setAuditor] =
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
      await getAudits();

    setAudits(data);

    setLoading(false);
  }

  async function handleSearch(value) {
    setSearch(value);

    if (value.trim() === "") {
      loadData();
      return;
    }

    const data =
      await searchAudits(value);

    setAudits(data);
  }

  async function handleStatus(value) {
    setStatus(value);

    const data =
      await filterAuditStatus(value);

    setAudits(data);
  }

  async function handleAuditor(value) {
    setAuditor(value);

    if (value === "All") {
      loadData();
      return;
    }

    const data =
      await filterAuditor(value);

    setAudits(data);
  }

  function handleAdd() {
    setSelected(null);
    setOpenDialog(true);
  }

  function handleEdit(audit) {
    setSelected(audit);
    setOpenDialog(true);
  }

  async function handleSave(data) {
    if (selected) {
      await updateAudit(
        selected.id,
        data
      );

      setMessage(
        "Audit updated successfully."
      );
    } else {
      await addAudit(data);

      setMessage(
        "Audit added successfully."
      );
    }

    setOpenDialog(false);

    setSnackbar(true);

    loadData();
  }

  function exportCSV() {
    const headers = [
      "Audit ID",
      "Audit Name",
      "Auditor",
      "Department",
      "Priority",
      "Status",
      "Start Date",
      "End Date",
    ];

    const csvRows =
      audits.map((audit) => [
        audit.id,
        audit.auditName,
        audit.auditor,
        audit.department,
        audit.priority,
        audit.status,
        audit.startDate,
        audit.endDate,
      ]);

    const csv =
      "\uFEFF" +
      [headers, ...csvRows]
        .map((row) =>
          row
            .map((v) => `"${v}"`)
            .join(",")
        )
        .join("\r\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "audits.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  const totalAudits =
    audits.length;

  const completed =
    audits.filter(
      (a) =>
        a.status ===
        "Completed"
    ).length;

  const inProgress =
    audits.filter(
      (a) =>
        a.status ===
        "In Progress"
    ).length;

  const critical =
    audits.filter(
      (a) =>
        a.priority ===
        "Critical"
    ).length;

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Audit Center
      </Typography>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid item xs={12} sm={6} lg={3}>
          <AuditStatCard
            title="Total Audits"
            value={totalAudits}
            icon={<FactCheckIcon />}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AuditStatCard
            title="Completed"
            value={completed}
            icon={
              <AssignmentTurnedInIcon />
            }
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AuditStatCard
            title="In Progress"
            value={inProgress}
            icon={
              <PendingActionsIcon />
            }
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AuditStatCard
            title="Critical"
            value={critical}
            icon={<ErrorOutlineIcon />}
            color="#d32f2f"
          />
        </Grid>

      </Grid>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid item xs={12} lg={6}>
          <AuditHistory />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AuditReports />
        </Grid>

        <Grid item xs={12} lg={6}>
          <UserActivities />
        </Grid>

        <Grid item xs={12} lg={6}>
          <SystemLogs />
        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >

        <AuditToolbar
          search={search}
          status={status}
          auditor={auditor}
          onSearch={handleSearch}
          onStatusChange={
            handleStatus
          }
          onAuditorChange={
            handleAuditor
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
        <AuditTable
          rows={audits}
          refresh={loadData}
          onEdit={handleEdit}
        />
      )}

      <AuditDialog
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

export default Audit;