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

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const violations = [
  {
    title: "ISO 27001 Policy Missing",
    owner: "IT Department",
    severity: "High",
  },
  {
    title: "Vendor Security Review Overdue",
    owner: "Procurement",
    severity: "Medium",
  },
  {
    title: "Annual Audit Pending",
    owner: "Compliance",
    severity: "High",
  },
  {
    title: "Access Review Not Completed",
    owner: "HR",
    severity: "Low",
  },
];

function chipColor(level) {
  switch (level) {
    case "High":
      return "error";

    case "Medium":
      return "warning";

    default:
      return "success";
  }
}

function ViolationsCard() {
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
          Violations
        </Typography>

        <List sx={{ p: 0 }}>

          {violations.map(
            (item, index) => (
              <div key={index}>

                <ListItem
                  sx={{ px: 0 }}
                >

                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor:
                          "error.main",
                      }}
                    >
                      <WarningAmberIcon />
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
                    primary={item.title}
                    secondary={item.owner}
                  />

                  <Chip
                    label={item.severity}
                    color={chipColor(item.severity)}
                    size="small"
                  />

                </ListItem>

                {index !==
                  violations.length - 1 && (
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

export default ViolationsCard;