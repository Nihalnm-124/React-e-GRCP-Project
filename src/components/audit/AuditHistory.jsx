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
} from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";

const history = [
  {
    title: "Business Continuity Audit Completed",
    description: "Completed by Emma Johnson",
    date: "25 May 2026",
  },
  {
    title: "Cloud Infrastructure Audit Started",
    description: "Assigned to Sophia Davis",
    date: "01 Aug 2026",
  },
  {
    title: "Financial Audit Scheduled",
    description: "Audit scheduled by Jennifer Lee",
    date: "18 Aug 2026",
  },
  {
    title: "HIPAA Compliance Audit Started",
    description: "Assigned to Olivia Martin",
    date: "12 Aug 2026",
  },
];

function AuditHistory() {
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
          Audit History
        </Typography>

        <List sx={{ p: 0 }}>

          {history.map((item, index) => (
            <div key={index}>

              <ListItem
                sx={{ px: 0 }}
              >

                <ListItemAvatar>

                  <Avatar
                    sx={{
                      bgcolor:
                        "primary.main",
                    }}
                  >
                    <HistoryIcon />
                  </Avatar>

                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      fontWeight={600}
                    >
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.description}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {item.date}
                      </Typography>
                    </>
                  }
                />

              </ListItem>

              {index !==
                history.length - 1 && (
                <Divider />
              )}

            </div>
          ))}

        </List>

      </CardContent>
    </Card>
  );
}

export default AuditHistory;