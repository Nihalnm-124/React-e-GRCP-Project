import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    month: "Jan",
    risks: 18,
  },
  {
    month: "Feb",
    risks: 22,
  },
  {
    month: "Mar",
    risks: 27,
  },
  {
    month: "Apr",
    risks: 20,
  },
  {
    month: "May",
    risks: 15,
  },
  {
    month: "Jun",
    risks: 12,
  },
];

function RiskTrendChart() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: 420,
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Risk Trend
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="risks"
              stroke="#ef4444"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}

export default RiskTrendChart;