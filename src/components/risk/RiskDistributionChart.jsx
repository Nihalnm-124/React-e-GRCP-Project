import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Low",
    value: 18,
  },
  {
    name: "Medium",
    value: 28,
  },
  {
    name: "High",
    value: 15,
  },
  {
    name: "Critical",
    value: 8,
  },
];

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#7f1d1d",
];

function RiskDistributionChart() {
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
          Risk Distribution
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}

export default RiskDistributionChart;