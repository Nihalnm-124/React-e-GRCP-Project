import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    month: "Jan",
    compliant: 78,
  },
  {
    month: "Feb",
    compliant: 81,
  },
  {
    month: "Mar",
    compliant: 84,
  },
  {
    month: "Apr",
    compliant: 86,
  },
  {
    month: "May",
    compliant: 91,
  },
  {
    month: "Jun",
    compliant: 94,
  },
];

function ComplianceMonitoring() {
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
          Compliance Monitoring
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
              dataKey="compliant"
              stroke="#16a34a"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}

export default ComplianceMonitoring;