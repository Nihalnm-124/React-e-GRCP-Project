import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

function NotificationCard({
  notifications,
}) {
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
      <CardContent
        sx={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Notifications
        </Typography>

        <List sx={{ p: 0 }}>
          {notifications.map(
            (notification, index) => (
              <Box
                key={index}
              >
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    px: 0,
                    transition: ".25s",

                    "&:hover": {
                      bgcolor:
                        "action.hover",
                      borderRadius: 2,
                    },
                  }}
                >
                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor:
                          "primary.light",
                      }}
                    >
                      <NotificationsActiveIcon />
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={600}
                      >
                        {
                          notification.title
                        }
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={0.5}
                        >
                          {
                            notification.message
                          }
                        </Typography>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mt={1}
                        >
                          <Chip
                            size="small"
                            label={
                              notification.priority
                            }
                            color={
                              notification.priority ===
                              "High"
                                ? "error"
                                : notification.priority ===
                                  "Medium"
                                ? "warning"
                                : "success"
                            }
                          />

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {
                              notification.time
                            }
                          </Typography>
                        </Box>
                      </>
                    }
                  />

                </ListItem>

                {index !==
                  notifications.length -
                    1 && (
                  <Divider />
                )}
              </Box>
            )
          )}
        </List>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;