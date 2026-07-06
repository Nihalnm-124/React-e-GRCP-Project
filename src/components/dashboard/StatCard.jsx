import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: 175,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        border: "1px solid",
        borderColor: "divider",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 5,
          bgcolor: color,
        },

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 16px 30px rgba(0,0,0,.15)",
          transition: ".3s",
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pt: 4,
          pb: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            pr: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.3,
              mb: 2,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: "3rem",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            mt={2}
          >
            <TrendingUpIcon
              sx={{
                color: "success.main",
                fontSize: 18,
                mr: .5,
              }}
            />

            <Typography
              color="success.main"
              fontWeight={600}
              fontSize="0.9rem"
            >
              +12% this month
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: 72,
            height: 72,
            minWidth: 72,
            borderRadius: "50%",
            bgcolor: `${color}20`,
            color: color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& svg": {
              fontSize: 36,
            },
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;