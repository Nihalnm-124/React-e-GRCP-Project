import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function RiskStatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: 150,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",

        "&:hover": {
          transform: "translateY(-5px)",
          transition: ".3s",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box>
          <Typography
            color="text.secondary"
            fontWeight={600}
          >
            {title}
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
            mt={1}
          >
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 65,
            height: 65,
            borderRadius: "50%",
            bgcolor: `${color}20`,
            color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& svg": {
              fontSize: 34,
            },
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

export default RiskStatCard;