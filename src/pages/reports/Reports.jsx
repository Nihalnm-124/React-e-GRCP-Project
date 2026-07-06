import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";

import ReportToolbar from "../../components/reports/ReportsToolbar";
import ReportTable from "../../components/reports/ReportsTable";
import ReportDialog from "../../components/reports/ReportsDialog";
import SaveReportDialog from "../../components/reports/SaveReportDialog";

import {
  getReports,
  searchReports,
  filterReportStatus,
  filterReportType,
  addReport,
  updateReport,
  exportExcel,
  saveReport,
} from "../../services/reportService";

function Reports() {

  const [loading, setLoading] =
    useState(true);

  const [reports, setReports] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [type, setType] =
    useState("All");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [saveDialog, setSaveDialog] =
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
      await getReports();

    setReports(data);

    setLoading(false);

  }

  async function handleSearch(
    value
  ) {

    setSearch(value);

    if (
      value.trim() === ""
    ) {

      loadData();

      return;

    }

    const data =
      await searchReports(
        value
      );

    setReports(data);

  }

  async function handleStatus(
    value
  ) {

    setStatus(value);

    const data =
      await filterReportStatus(
        value
      );

    setReports(data);

  }

  async function handleType(
    value
  ) {

    setType(value);

    const data =
      await filterReportType(
        value
      );

    setReports(data);

  }

  function handleAdd() {

    setSelected(null);

    setOpenDialog(true);

  }

  function handleEdit(
    report
  ) {

    setSelected(report);

    setOpenDialog(true);

  }

  async function handleSave(
    data
  ) {

    if (selected) {

      await updateReport(
        selected.id,
        data
      );

      setMessage(
        "Report updated successfully."
      );

    } else {

      await addReport(data);

      setMessage(
        "Report added successfully."
      );

    }

    setOpenDialog(false);

    setSnackbar(true);

    loadData();

  }

  function handleExcel() {

    exportExcel(
      reports,
      "Reports"
    );

  }

  async function handleSaveReport(
    report
  ) {

    await saveReport(
      report
    );

    setSaveDialog(false);

    setMessage(
      "Report saved successfully."
    );

    setSnackbar(true);

  }
    return (

    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Reports & Analytics
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >

        <ReportToolbar
          search={search}
          status={status}
          type={type}
          onSearch={handleSearch}
          onStatusChange={
            handleStatus
          }
          onTypeChange={
            handleType
          }
          onAdd={handleAdd}
          onExport={handleExcel}
          onSave={() =>
            setSaveDialog(true)
          }
        />

      </Paper>

      {loading ? (

        <Skeleton
          variant="rounded"
          height={500}
        />

      ) : (

        <ReportTable
          rows={reports}
          refresh={loadData}
          onEdit={handleEdit}
        />

      )}

      <ReportDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        selected={selected}
        onSave={handleSave}
      />

      <SaveReportDialog
        open={saveDialog}
        onClose={() =>
          setSaveDialog(false)
        }
        onSave={
          handleSaveReport
        }
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

export default Reports;