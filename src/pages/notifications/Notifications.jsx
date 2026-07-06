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

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DraftsIcon from "@mui/icons-material/Drafts";
import ErrorIcon from "@mui/icons-material/Error";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

import NotificationToolbar from "../../components/notifications/NotificationToolbar";
import NotificationStatCard from "../../components/notifications/NotificationStatCard";
import NotificationList from "../../components/notifications/NotificationList";

import {
  getNotifications,
  searchNotifications,
  filterPriority,
  filterStatus,
  generateNotification,
} from "../../services/notificationService";

function Notifications() {

  const [loading, setLoading] =
    useState(true);

  const [notifications, setNotifications] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [priority, setPriority] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [snackbar, setSnackbar] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    loadData();

    const timer =
      setInterval(() => {

        generateNotification();

        loadData();

        setMessage(
          "New notification received."
        );

        setSnackbar(true);

      }, 10000);

    return () =>
      clearInterval(timer);

  }, []);

  async function loadData() {

    setLoading(true);

    const data =
      await getNotifications();

    setNotifications(data);

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
      await searchNotifications(
        value
      );

    setNotifications(data);

  }

  async function handlePriority(
    value
  ) {

    setPriority(value);

    const data =
      await filterPriority(
        value
      );

    setNotifications(data);

  }

  async function handleStatus(
    value
  ) {

    setStatus(value);

    const data =
      await filterStatus(
        value
      );

    setNotifications(data);

  }

  function exportCSV() {

    const headers = [
      "Title",
      "Message",
      "Priority",
      "Status",
      "Time",
    ];

    const csvRows =
      notifications.map(
        (item) => [

          item.title,

          item.message,

          item.priority,

          item.status,

          item.time,

        ]
      );

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
      "notifications.csv";

    link.click();

    URL.revokeObjectURL(
      url
    );

  }

  const total =
    notifications.length;

  const unread =
    notifications.filter(
      (n) =>
        n.status ===
        "Unread"
    ).length;

  const read =
    notifications.filter(
      (n) =>
        n.status ===
        "Read"
    ).length;

  const high =
    notifications.filter(
      (n) =>
        n.priority ===
        "High"
    ).length;
      return (

    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Notification Center
      </Typography>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid item xs={12} sm={6} lg={3}>

          <NotificationStatCard
            title="Total"
            value={total}
            icon={
              <NotificationsActiveIcon />
            }
            color="#1976d2"
          />

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <NotificationStatCard
            title="Unread"
            value={unread}
            icon={<DraftsIcon />}
            color="#ed6c02"
          />

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <NotificationStatCard
            title="High Priority"
            value={high}
            icon={<ErrorIcon />}
            color="#d32f2f"
          />

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <NotificationStatCard
            title="Read"
            value={read}
            icon={
              <MarkEmailReadIcon />
            }
            color="#2e7d32"
          />

        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >

        <NotificationToolbar
          search={search}
          priority={priority}
          status={status}
          onSearch={
            handleSearch
          }
          onPriorityChange={
            handlePriority
          }
          onStatusChange={
            handleStatus
          }
          onExport={exportCSV}
        />

      </Paper>

      {loading ? (

        <Skeleton
          variant="rounded"
          height={520}
        />

      ) : (

        <NotificationList
          notifications={
            notifications
          }
          refresh={loadData}
        />

      )}

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

export default Notifications;