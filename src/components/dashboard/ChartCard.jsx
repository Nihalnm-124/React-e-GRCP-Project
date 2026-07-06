import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
];

function ChartCard({ data }) {
  const riskData = [
    {
      name: "Low",
      value: 45,
    },
    {
      name: "Medium",
      value: 30,
    },
    {
      name: "High",
      value: 25,
    },
  ];

  const complianceData = [
    {
      name: "Compliant",
      value: 82,
    },
    {
      name: "Pending",
      value: 12,
    },
    {
      name: "Violation",
      value: 6,
    },
  ];

  const spendingData = [
    {
      department: "IT",
      amount: 90,
    },
    {
      department: "HR",
      amount: 55,
    },
    {
      department: "Finance",
      amount: 72,
    },
    {
      department: "Admin",
      amount: 48,
    },
  ];

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        xs={12}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Monthly Procurement Trend
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#93c5fd"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Risk Trend
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <PieChart>
                <Pie
                  data={riskData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {riskData.map(
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
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Compliance Trend
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <PieChart>
                <Pie
                  data={complianceData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {complianceData.map(
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
      </Grid>

      <Grid
        item
        xs={12}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Department Spending
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart
                data={spendingData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="department"
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="amount"
                  fill="#2563eb"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ChartCard;