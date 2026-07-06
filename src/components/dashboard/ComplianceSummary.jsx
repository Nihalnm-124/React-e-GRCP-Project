import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Grid,
} from "@mui/material";

function ComplianceSummary() {
  const compliance = [
    {
      title: "ISO 27001",
      value: 92,
      color: "#16a34a",
    },
    {
      title: "SOC 2",
      value: 84,
      color: "#2563eb",
    },
    {
      title: "GDPR",
      value: 76,
      color: "#f59e0b",
    },
    {
      title: "PCI DSS",
      value: 68,
      color: "#dc2626",
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
          mb={3}
        >
          Compliance Summary
        </Typography>

        <Grid
          container
          spacing={3}
        >
          {compliance.map(
            (item) => (
              <Grid
                item
                xs={12}
                key={item.title}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography
                    fontWeight={600}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    fontWeight={700}
                  >
                    {item.value}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={item.value}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      "#e5e7eb",

                    "& .MuiLinearProgress-bar":
                      {
                        backgroundColor:
                          item.color,
                      },
                  }}
                />
              </Grid>
            )
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ComplianceSummary;