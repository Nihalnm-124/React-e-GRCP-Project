import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DraftsIcon from "@mui/icons-material/Drafts";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

import {
  markAsRead,
  markAsUnread,
  deleteNotification,
} from "../../services/notificationService";

function NotificationList({
  notifications,
  refresh,
}) {

  const [selected, setSelected] =
    useState(null);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [snackbar, setSnackbar] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const priorityColor = (
    priority
  ) => {

    switch (priority) {

      case "High":
        return "error";

      case "Medium":
        return "warning";

      case "Low":
        return "success";

      default:
        return "default";

    }

  };

  async function handleRead(
    id
  ) {

    await markAsRead(id);

    setMessage(
      "Marked as Read."
    );

    setSnackbar(true);

    refresh();

  }

  async function handleUnread(
    id
  ) {

    await markAsUnread(id);

    setMessage(
      "Marked as Unread."
    );

    setSnackbar(true);

    refresh();

  }

  async function handleDelete(
    id
  ) {

    await deleteNotification(
      id
    );

    setMessage(
      "Notification deleted."
    );

    setSnackbar(true);

    refresh();

  }

  function handleView(item) {

    setSelected(item);

    setViewOpen(true);

  }

  return (

    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >

      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Notifications
        </Typography>

        <List sx={{ p: 0 }}>

          {notifications.map(
            (item, index) => (

              <div
                key={item.id}
              >

                <ListItem
                  sx={{
                    px: 0,

                    bgcolor:
                      item.status ===
                      "Unread"
                        ? "action.hover"
                        : "transparent",

                    borderRadius: 2,
                  }}
                >

                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor:
                          "primary.main",
                      }}
                    >
                      <NotificationsActiveIcon />
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
  primary={
    <Typography
      fontWeight={700}
    >
      {item.title}
    </Typography>
  }
  secondary={
    <>
      <Typography
        variant="body2"
      >
        {item.message}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        mt={1}
      >
        <Chip
          size="small"
          label={item.priority}
          color={priorityColor(
            item.priority
          )}
        />

        <Chip
          size="small"
          label={item.status}
          color={
            item.status === "Read"
              ? "success"
              : "warning"
          }
        />
      </Stack>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        {item.time}
      </Typography>
    </>
  }
/>

<Stack
  direction="row"
  spacing={1}
>

  <Tooltip title="View">

    <IconButton
      color="primary"
      onClick={() =>
        handleView(item)
      }
    >
      <VisibilityIcon />
    </IconButton>

  </Tooltip>

  {item.status ===
  "Unread" ? (

    <Tooltip title="Mark as Read">

      <IconButton
        color="success"
        onClick={() =>
          handleRead(item.id)
        }
      >
        <DraftsIcon />
      </IconButton>

    </Tooltip>

  ) : (

    <Tooltip title="Mark as Unread">

      <IconButton
        color="warning"
        onClick={() =>
          handleUnread(item.id)
        }
      >
        <MarkEmailUnreadIcon />
      </IconButton>

    </Tooltip>

  )}

  <Tooltip title="Delete">

    <IconButton
      color="error"
      onClick={() =>
        handleDelete(item.id)
      }
    >
      <DeleteIcon />
    </IconButton>

  </Tooltip>

</Stack>

</ListItem>

{index !==
  notifications.length - 1 && (
  <Divider />
)}

</div>

))
}

</List>

</CardContent>

<Dialog
  open={viewOpen}
  onClose={() =>
    setViewOpen(false)
  }
  fullWidth
  maxWidth="sm"
>

  <DialogTitle>
    Notification Details
  </DialogTitle>

  <DialogContent>

    {selected && (

      <>

        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          {selected.title}
        </Typography>

        <Typography
          paragraph
        >
          {selected.message}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          mb={2}
        >

          <Chip
            label={
              selected.priority
            }
            color={priorityColor(
              selected.priority
            )}
          />

          <Chip
            label={
              selected.status
            }
            color={
              selected.status ===
              "Read"
                ? "success"
                : "warning"
            }
          />

        </Stack>

        <Typography
          color="text.secondary"
        >
          {selected.time}
        </Typography>

      </>

    )}

  </DialogContent>

  <DialogActions>

    <Button
      onClick={() =>
        setViewOpen(false)
      }
    >
      Close
    </Button>

  </DialogActions>

</Dialog>

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

</Card>

);

}

export default NotificationList;