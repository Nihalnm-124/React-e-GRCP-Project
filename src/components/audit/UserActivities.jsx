import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

const activities = [
  {
    user: "Emma Johnson",
    activity: "Created Financial Audit",
    time: "10 mins ago",
    type: "Create",
  },
  {
    user: "Sophia Davis",
    activity: "Updated Cloud Security Audit",
    time: "35 mins ago",
    type: "Update",
  },
  {
    user: "Jennifer Lee",
    activity: "Submitted Audit Report",
    time: "1 hour ago",
    type: "Submit",
  },
  {
    user: "Olivia Martin",
    activity: "Closed HIPAA Audit",
    time: "Today",
    type: "Close",
  },
];

function chipColor(type) {
  switch (type) {
    case "Create":
      return "primary";

    case "Update":
      return "warning";

    case "Submit":
      return "success";

    case "Close":
      return "secondary";

    default:
      return "default";
  }
}

function UserActivities() {
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
          User Activities
        </Typography>

        <List sx={{ p: 0 }}>

          {activities.map(
            (item, index) => (
              <div key={index}>

                <ListItem sx={{ px: 0 }}>

                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor:
                          "primary.main",
                      }}
                    >
                      <PersonIcon />
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography fontWeight={600}>
                        {item.user}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.activity}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {item.time}
                        </Typography>
                      </>
                    }
                  />

                  <Chip
                    label={item.type}
                    size="small"
                    color={chipColor(item.type)}
                  />

                </ListItem>

                {index !==
                  activities.length - 1 && (
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

export default UserActivities;