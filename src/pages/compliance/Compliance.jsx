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

import GppGoodIcon from "@mui/icons-material/GppGood";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DescriptionIcon from "@mui/icons-material/Description";
import EventBusyIcon from "@mui/icons-material/EventBusy";

import ComplianceToolbar from "../../components/compliance/ComplianceToolbar";
import ComplianceTable from "../../components/compliance/ComplianceTable";
import ComplianceDialog from "../../components/compliance/ComplianceDialog";

import ComplianceStatCard from "../../components/compliance/ComplianceStatCard";
import ComplianceMonitoring from "../../components/compliance/ComplianceMonitoring";
import ViolationsCard from "../../components/compliance/ViolationsCard";
import MissingDocuments from "../../components/compliance/MissingDocuments";
import ExpiredCertificates from "../../components/compliance/ExpiredCertificates";

import {
  getCompliances,
  searchCompliance,
  filterComplianceStatus,
  filterFramework,
  addCompliance,
  updateCompliance,
} from "../../services/complianceService";

function Compliance() {
  const [loading, setLoading] =
    useState(true);

  const [compliances, setCompliances] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [framework, setFramework] =
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
      await getCompliances();

    setCompliances(data);

    setLoading(false);
  }

  async function handleSearch(value) {
    setSearch(value);

    if (value.trim() === "") {
      loadData();
      return;
    }

    const data =
      await searchCompliance(value);

    setCompliances(data);
  }

  async function handleStatus(value) {
    setStatus(value);

    const data =
      await filterComplianceStatus(value);

    setCompliances(data);
  }

  async function handleFramework(value) {
    setFramework(value);

    const data =
      await filterFramework(value);

    setCompliances(data);
  }

  function handleAdd() {
    setSelected(null);
    setOpenDialog(true);
  }

  function handleEdit(item) {
    setSelected(item);
    setOpenDialog(true);
  }

  async function handleSave(data) {
    if (selected) {
      await updateCompliance(
        selected.id,
        data
      );

      setMessage(
        "Compliance updated successfully."
      );
    } else {
      await addCompliance(data);

      setMessage(
        "Compliance added successfully."
      );
    }

    setOpenDialog(false);

    setSnackbar(true);

    loadData();
  }

  function exportCSV() {
    const headers = [
      "Policy",
      "Control",
      "Owner",
      "Framework",
      "Status",
      "Review Date",
      "Evidence",
    ];

    const csvRows =
      compliances.map((item) => [
        item.policy,
        item.control,
        item.owner,
        item.framework,
        item.status,
        item.reviewDate,
        item.evidence,
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
      "compliance.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  const total =
    compliances.length;

  const violations =
    compliances.filter(
      (c) => c.status === "Non-Compliant"
    ).length;

  const missingDocs =
    compliances.filter(
      (c) => !c.evidence
    ).length;

  const expired =
    compliances.filter(
      (c) => c.status === "Expired"
    ).length;

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Compliance Center
      </Typography>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid item xs={12} sm={6} lg={3}>
          <ComplianceStatCard
            title="Compliance"
            value={total}
            icon={<GppGoodIcon />}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <ComplianceStatCard
            title="Violations"
            value={violations}
            icon={<WarningAmberIcon />}
            color="#d32f2f"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <ComplianceStatCard
            title="Missing Docs"
            value={missingDocs}
            icon={<DescriptionIcon />}
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <ComplianceStatCard
            title="Expired"
            value={expired}
            icon={<EventBusyIcon />}
            color="#7b1fa2"
          />
        </Grid>

      </Grid>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid item xs={12} lg={6}>
          <ComplianceMonitoring />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ViolationsCard />
        </Grid>

        <Grid item xs={12} lg={6}>
          <MissingDocuments />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ExpiredCertificates />
        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <ComplianceToolbar
          search={search}
          status={status}
          framework={framework}
          onSearch={handleSearch}
          onStatusChange={handleStatus}
          onFrameworkChange={
            handleFramework
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
        <ComplianceTable
          rows={compliances}
          refresh={loadData}
          onEdit={handleEdit}
        />
      )}

      <ComplianceDialog
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

export default Compliance;