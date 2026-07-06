import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const levels = [
  ["Low", "Low", "Medium", "High", "Critical"],
  ["Low", "Medium", "Medium", "High", "Critical"],
  ["Medium", "Medium", "High", "High", "Critical"],
  ["Medium", "High", "High", "Critical", "Critical"],
  ["High", "High", "Critical", "Critical", "Critical"],
];

function getColor(level) {
  switch (level) {
    case "Low":
      return "#4caf50";

    case "Medium":
      return "#ff9800";

    case "High":
      return "#f44336";

    case "Critical":
      return "#7b1fa2";

    default:
      return "#9e9e9e";
  }
}

function RiskHeatMap() {
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
          fontWeight="bold"
          mb={3}
        >
          Risk Heat Map
        </Typography>

        <Grid
          container
          spacing={1}
        >
          {levels.flat().map(
            (item, index) => (
              <Grid
                item
                xs={2.4}
                key={index}
              >
                <Box
                  sx={{
                    height: 70,
                    bgcolor:
                      getColor(item),
                    borderRadius: 2,
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  {item}
                </Box>
              </Grid>
            )
          )}
        </Grid>

        <Box
          mt={3}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="body2">
            Probability →
          </Typography>

          <Typography variant="body2">
            ↑ Impact
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
}

export default RiskHeatMap;