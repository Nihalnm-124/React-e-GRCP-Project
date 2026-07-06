import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FactCheckIcon from "@mui/icons-material/FactCheck";

function QuickActions() {
  const actions = [
    {
      title: "New Procurement",
      icon: <AddShoppingCartIcon />,
    },
    {
      title: "Add Vendor",
      icon: <BusinessIcon />,
    },
    {
      title: "Report Risk",
      icon: <WarningAmberIcon />,
    },
    {
      title: "New Audit",
      icon: <FactCheckIcon />,
    },
  ];

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
          mb={3}
        >
          Quick Actions
        </Typography>

        <Grid
          container
          spacing={2}
        >
          {actions.map(
            (action) => (
              <Grid
                item
                xs={6}
                key={action.title}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={action.icon}
                  sx={{
                    height: 60,
                    borderRadius: 3,
                  }}
                >
                  {action.title}
                </Button>
              </Grid>
            )
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default QuickActions;