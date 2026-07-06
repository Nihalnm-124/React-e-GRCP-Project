import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GavelIcon from "@mui/icons-material/Gavel";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function getActivityIcon(title) {
  const text = title.toLowerCase();

  if (text.includes("vendor"))
    return <BusinessIcon />;

  if (text.includes("procurement"))
    return <ShoppingCartIcon />;

  if (text.includes("risk"))
    return <WarningAmberIcon />;

  return <GavelIcon />;
}

function getAvatarColor(title) {
  const text = title.toLowerCase();

  if (text.includes("vendor"))
    return "#2563eb";

  if (text.includes("procurement"))
    return "#16a34a";

  if (text.includes("risk"))
    return "#f59e0b";

  return "#7c3aed";
}

function getChipColor(title) {
  const text = title.toLowerCase();

  if (text.includes("vendor"))
    return "primary";

  if (text.includes("procurement"))
    return "success";

  if (text.includes("risk"))
    return "warning";

  return "secondary";
}

function ActivityCard({
  activities = [],
}) {
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
          Recent Activity
        </Typography>

        {activities.length === 0 ? (
          <Typography
            color="text.secondary"
          >
            No recent activity.
          </Typography>
        ) : (
          activities.map(
            (activity, index) => (
              <Box key={index}>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 2,
                    px: 1,
                    borderRadius: 2,
                    transition: ".25s",

                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >

                  <Avatar
                    sx={{
                      bgcolor:
                        getAvatarColor(
                          activity.title
                        ),
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {getActivityIcon(
                      activity.title
                    )}
                  </Avatar>

                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  >

                    <Typography
                      fontWeight={600}
                    >
                      {activity.title}
                    </Typography>

                    {activity.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                      >
                        {
                          activity.description
                        }
                      </Typography>
                    )}

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      mt={1}
                    >

                      <FiberManualRecordIcon
                        sx={{
                          fontSize: 10,
                          color:
                            getAvatarColor(
                              activity.title
                            ),
                        }}
                      />

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {activity.time}
                      </Typography>

                    </Box>

                  </Box>

                  <Chip
                    size="small"
                    label={
                      activity.status ||
                      "Completed"
                    }
                    color={getChipColor(
                      activity.title
                    )}
                  />

                </Box>

                {index !==
                  activities.length -
                    1 && (
                  <Divider />
                )}

              </Box>
            )
          )
        )}

      </CardContent>
    </Card>
  );
}

export default ActivityCard;