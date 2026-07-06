import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const matrix = [
  ["Low", "Low", "Medium", "High", "High"],
  ["Low", "Medium", "Medium", "High", "Critical"],
  ["Medium", "Medium", "High", "Critical", "Critical"],
  ["Medium", "High", "High", "Critical", "Critical"],
  ["High", "High", "Critical", "Critical", "Critical"],
];

function getColor(level) {
  switch (level) {
    case "Low":
      return "#22c55e";

    case "Medium":
      return "#f59e0b";

    case "High":
      return "#ef4444";

    case "Critical":
      return "#7f1d1d";

    default:
      return "#9ca3af";
  }
}

function RiskMatrix() {
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
          Risk Matrix
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(5,1fr)",
            gap: 1,
          }}
        >
          {matrix.flat().map(
            (item, index) => (
              <Box
                key={index}
                sx={{
                  height: 70,
                  borderRadius: 2,
                  bgcolor:
                    getColor(item),
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {item}
              </Box>
            )
          )}
        </Box>

        <Box
          mt={2}
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

export default RiskMatrix;