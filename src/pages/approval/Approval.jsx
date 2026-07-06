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

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import ApprovalToolbar from "../../components/approval/ApprovalToolbar";
import ApprovalQueueTabs from "../../components/approval/ApprovalQueueTabs";
import ApprovalTable from "../../components/approval/ApprovalTable";
import ApprovalStatCard from "../../components/approval/ApprovalStatCard";
import ApproveDialog from "../../components/approval/ApproveDialog";

import {
  getApprovals,
  searchApprovals,
  filterApprovalStatus,
  addApproval,
} from "../../services/approvalService";

function Approval() {

  const [loading, setLoading] =
    useState(true);

  const [approvals, setApprovals] =
    useState([]);

  const [rows, setRows] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  const [openDialog, setOpenDialog] =
    useState(false);

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
      await getApprovals();

    setApprovals(data);

    setRows(
      data.filter(
        (item) =>
          item.status ===
          "Pending"
      )
    );

    setLoading(false);

  }

  async function handleSearch(
    value
  ) {

    setSearch(value);

    if (
      value.trim() === ""
    ) {

      handleQueue(status);

      return;

    }

    const data =
      await searchApprovals(
        value
      );

    if (
      status === "All"
    ) {

      setRows(data);

    } else {

      setRows(
        data.filter(
          (item) =>
            item.status ===
            status
        )
      );

    }

  }

  async function handleQueue(
    value
  ) {

    setStatus(value);

    if (
      value === "All"
    ) {

      const data =
        await getApprovals();

      setRows(data);

      return;

    }

    const data =
      await filterApprovalStatus(
        value
      );

    setRows(data);

  }

  function handleAdd() {

    setOpenDialog(true);

  }

  async function handleSave(
    data
  ) {

    await addApproval(data);

    setOpenDialog(false);

    setMessage(
      "Approval created successfully."
    );

    setSnackbar(true);

    loadData();

  }

  function exportCSV() {

    const headers = [
      "Title",
      "Requester",
      "Department",
      "Amount",
      "Priority",
      "Status",
      "Date",
    ];

    const csvRows =
      rows.map((item) => [

        item.title,
        item.requester,
        item.department,
        item.amount,
        item.priority,
        item.status,
        item.date,

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

    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "approvals.csv";

    link.click();

    URL.revokeObjectURL(
      url
    );

  }

  const pending =
    approvals.filter(
      (a) =>
        a.status ===
        "Pending"
    ).length;

  const approved =
    approvals.filter(
      (a) =>
        a.status ===
        "Approved"
    ).length;

  const rejected =
    approvals.filter(
      (a) =>
        a.status ===
        "Rejected"
    ).length;

  const escalated =
    approvals.filter(
      (a) =>
        a.status ===
        "Escalated"
    ).length;
      return (

    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Approval Workbench
      </Typography>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid item xs={12} sm={6} lg={3}>

          <ApprovalStatCard
            title="Pending"
            value={pending}
            icon={
              <PendingActionsIcon />
            }
            color="#ed6c02"
          />

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <ApprovalStatCard
            title="Approved"
            value={approved}
            icon={
              <CheckCircleIcon />
            }
            color="#2e7d32"
          />

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <ApprovalStatCard
            title="Rejected"
            value={rejected}
            icon={
              <CancelIcon />
            }
            color="#d32f2f"
          />

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <ApprovalStatCard
            title="Escalated"
            value={escalated}
            icon={
              <PriorityHighIcon />
            }
            color="#7b1fa2"
          />

        </Grid>

      </Grid>

      <ApprovalQueueTabs
        value={status}
        onChange={
          handleQueue
        }
        counts={{
          pending,
          approved,
          rejected,
          escalated,
        }}
      />

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >

        <ApprovalToolbar
          search={search}
          status={status}
          onSearch={
            handleSearch
          }
          onStatusChange={
            handleQueue
          }
          onAdd={handleAdd}
          onExport={exportCSV}
        />

      </Paper>

      {loading ? (

        <Skeleton
          variant="rounded"
          height={520}
        />

      ) : (

        <ApprovalTable
          rows={rows}
          refresh={loadData}
        />

      )}

      <ApproveDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        selected={null}
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

export default Approval;