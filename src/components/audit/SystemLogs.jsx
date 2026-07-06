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
} from "@mui/material";

import StorageIcon from "@mui/icons-material/Storage";

const logs = [
  {
    action: "User Login",
    user: "Administrator",
    time: "09:15 AM",
    status: "Success",
  },
  {
    action: "Audit Report Generated",
    user: "Emma Johnson",
    time: "10:40 AM",
    status: "Success",
  },
  {
    action: "Database Backup",
    user: "System",
    time: "11:30 AM",
    status: "Completed",
  },
  {
    action: "Unauthorized Access Attempt",
    user: "Unknown",
    time: "12:20 PM",
    status: "Blocked",
  },
  {
    action: "Compliance Data Updated",
    user: "Sophia Davis",
    time: "02:15 PM",
    status: "Success",
  },
];

function getColor(status) {
  switch (status) {
    case "Success":
      return "success";

    case "Completed":
      return "primary";

    case "Blocked":
      return "error";

    default:
      return "default";
  }
}

function SystemLogs() {
  return (
    <Card
      elevation={0}
      sx={{
        height: 420,
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
          System Logs
        </Typography>

        <List sx={{ p: 0 }}>

          {logs.map((log, index) => (
            <div key={index}>

              <ListItem sx={{ px: 0 }}>

                <ListItemAvatar>

                  <Avatar
                    sx={{
                      bgcolor:
                        "info.main",
                    }}
                  >
                    <StorageIcon />
                  </Avatar>

                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      fontWeight={600}
                    >
                      {log.action}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {log.user}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {log.time}
                      </Typography>
                    </>
                  }
                />

                <Chip
                  size="small"
                  label={log.status}
                  color={getColor(log.status)}
                />

              </ListItem>

              {index !==
                logs.length - 1 && (
                <Divider />
              )}

            </div>
          ))}

        </List>

      </CardContent>
    </Card>
  );
}

export default SystemLogs;