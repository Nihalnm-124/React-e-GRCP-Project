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

import DescriptionIcon from "@mui/icons-material/Description";

const reports = [
  {
    report: "Financial Audit Report",
    auditor: "Emma Johnson",
    status: "Completed",
  },
  {
    report: "Cloud Security Assessment",
    auditor: "Sophia Davis",
    status: "In Review",
  },
  {
    report: "Vendor Compliance Audit",
    auditor: "Jennifer Lee",
    status: "Completed",
  },
  {
    report: "HIPAA Compliance Report",
    auditor: "Olivia Martin",
    status: "Pending",
  },
];

function getColor(status) {
  switch (status) {
    case "Completed":
      return "success";

    case "In Review":
      return "warning";

    case "Pending":
      return "error";

    default:
      return "default";
  }
}

function AuditReports() {
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
          Audit Reports
        </Typography>

        <List sx={{ p: 0 }}>

          {reports.map(
            (item, index) => (
              <div key={index}>

                <ListItem
                  sx={{ px: 0 }}
                >

                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor:
                          "secondary.main",
                      }}
                    >
                      <DescriptionIcon />
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={600}
                      >
                        {item.report}
                      </Typography>
                    }
                    secondary={
                      item.auditor
                    }
                  />

                  <Chip
                    size="small"
                    label={item.status}
                    color={getColor(
                      item.status
                    )}
                  />

                </ListItem>

                {index !==
                  reports.length - 1 && (
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

export default AuditReports;