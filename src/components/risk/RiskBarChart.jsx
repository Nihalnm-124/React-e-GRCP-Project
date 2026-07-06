import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    category: "Cyber",
    count: 12,
  },
  {
    category: "Financial",
    count: 8,
  },
  {
    category: "Operational",
    count: 15,
  },
  {
    category: "Compliance",
    count: 10,
  },
  {
    category: "Vendor",
    count: 7,
  },
];

function RiskBarChart() {
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
          Risk Categories
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#1976d2"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}

export default RiskBarChart;