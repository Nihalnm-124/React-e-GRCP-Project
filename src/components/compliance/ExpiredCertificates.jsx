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

import EventBusyIcon from "@mui/icons-material/EventBusy";

const certificates = [
  {
    certificate: "ISO 9001",
    vendor: "ABC Technologies",
    expiry: "12 Jul 2026",
    status: "Expired",
  },
  {
    certificate: "SOC 2",
    vendor: "XYZ Solutions",
    expiry: "28 Jul 2026",
    status: "Expiring Soon",
  },
  {
    certificate: "PCI DSS",
    vendor: "Global Systems",
    expiry: "05 Jun 2026",
    status: "Expired",
  },
  {
    certificate: "ISO 27001",
    vendor: "Secure Tech",
    expiry: "18 Aug 2026",
    status: "Expiring Soon",
  },
];

function getColor(status) {
  switch (status) {
    case "Expired":
      return "error";

    case "Expiring Soon":
      return "warning";

    default:
      return "success";
  }
}

function ExpiredCertificates() {
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
          Expired Certifications
        </Typography>

        <List sx={{ p: 0 }}>

          {certificates.map(
            (item, index) => (
              <div key={index}>

                <ListItem sx={{ px: 0 }}>

                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor:
                          "error.main",
                      }}
                    >
                      <EventBusyIcon />
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      item.certificate
                    }
                    secondary={`${item.vendor} • Expires: ${item.expiry}`}
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
                  certificates.length - 1 && (
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

export default ExpiredCertificates;