import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

function NotificationDialog({
  open,
  onClose,
  notification,
}) {

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

  if (!notification)
    return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Notification Details
      </DialogTitle>

      <DialogContent>

        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          {notification.title}
        </Typography>

        <Typography
          paragraph
        >
          {notification.message}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          mb={2}
        >

          <Chip
            label={
              notification.priority
            }
            color={priorityColor(
              notification.priority
            )}
          />

          <Chip
            label={
              notification.status
            }
            color={
              notification.status ===
              "Read"
                ? "success"
                : "warning"
            }
          />

        </Stack>

        <Typography
          color="text.secondary"
        >
          {notification.time}
        </Typography>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default NotificationDialog;