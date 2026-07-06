import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";

function TopRiskVendors() {
  const vendors = [
    {
      name: "ABC Technologies",
      risk: "High",
      score: 91,
    },
    {
      name: "Global Supplies",
      risk: "High",
      score: 88,
    },
    {
      name: "Prime Solutions",
      risk: "Medium",
      score: 74,
    },
    {
      name: "Vertex Systems",
      risk: "Low",
      score: 42,
    },
  ];

  const getColor = (risk) => {
    if (risk === "High") return "error";
    if (risk === "Medium") return "warning";
    return "success";
  };

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
          mb={2}
        >
          Top Risk Vendors
        </Typography>

        <List sx={{ p: 0 }}>
          {vendors.map(
            (vendor, index) => (
              <div key={vendor.name}>
                <ListItem
                  sx={{
                    px: 0,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor:
                          "error.main",
                      }}
                    >
                      <BusinessIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={vendor.name}
                    secondary={`Risk Score : ${vendor.score}`}
                  />

                  <Chip
                    label={vendor.risk}
                    color={getColor(vendor.risk)}
                    size="small"
                  />
                </ListItem>

                {index !==
                  vendors.length - 1 && (
                  <Divider />
                )}
              </div>
            )
          )}
        </List>
      </CardContent>
    </Card>
  );
}

export default TopRiskVendors;