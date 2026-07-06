import {
  Paper,
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

function ReportChart({ data }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        height: 400,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        Monthly Report Generation
      </Typography>

      <ResponsiveContainer
        width="100%"
        height="90%"
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
            dataKey="reports"
            stroke="#1976d2"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default ReportChart;