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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function RecentApprovals() {
  const approvals = [
    {
      id: "PR-1024",
      user: "Finance Department",
      status: "Approved",
      time: "10 min ago",
    },
    {
      id: "PR-1025",
      user: "IT Department",
      status: "Approved",
      time: "25 min ago",
    },
    {
      id: "PR-1026",
      user: "HR Department",
      status: "Pending",
      time: "45 min ago",
    },
    {
      id: "PR-1027",
      user: "Admin Department",
      status: "Approved",
      time: "1 hour ago",
    },
  ];

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
          mb={2}
        >
          Recent Approvals
        </Typography>

        <List sx={{ p: 0 }}>
          {approvals.map(
            (item, index) => (
              <div key={item.id}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor:
                          item.status ===
                          "Approved"
                            ? "success.main"
                            : "warning.main",
                      }}
                    >
                      <CheckCircleIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={item.id}
                    secondary={item.user}
                  />

                  <div>
                    <Chip
                      size="small"
                      label={item.status}
                      color={
                        item.status ===
                        "Approved"
                          ? "success"
                          : "warning"
                      }
                    />

                    <Typography
                      variant="caption"
                      display="block"
                      textAlign="right"
                      mt={1}
                    >
                      {item.time}
                    </Typography>
                  </div>
                </ListItem>

                {index !==
                  approvals.length - 1 && (
                  <Divider />
                )}
              </div>
            )
          )}
        </List>
      </CardContent>
    </Card>
  );
}

export default RecentApprovals;