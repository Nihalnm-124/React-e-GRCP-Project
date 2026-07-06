import {
  Tabs,
  Tab,
  Paper,
  Badge,
} from "@mui/material";

function ApprovalQueueTabs({
  value,
  onChange,
  counts,
}) {
  const tabs = [
    {
      label: "Pending",
      value: "Pending",
      count: counts.pending,
    },
    {
      label: "Approved",
      value: "Approved",
      count: counts.approved,
    },
    {
      label: "Rejected",
      value: "Rejected",
      count: counts.rejected,
    },
    {
      label: "Escalated",
      value: "Escalated",
      count: counts.escalated,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        mb: 3,
      }}
    >
      <Tabs
        value={value}
        onChange={(e, v) =>
          onChange(v)
        }
        variant="fullWidth"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              <Badge
                badgeContent={
                  tab.count
                }
                color="primary"
              >
                {tab.label}
              </Badge>
            }
          />
        ))}
      </Tabs>
    </Paper>
  );
}

export default ApprovalQueueTabs;