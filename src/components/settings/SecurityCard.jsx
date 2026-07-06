import {
  Card,
  CardContent,
  Typography,
  Stack,
  Switch,
  Divider,
  Button,
} from "@mui/material";

function SecurityCard({
  security,
  onToggle2FA,
  onPassword,
  onLogoutAll,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          Security Settings
        </Typography>

        <Stack
          spacing={3}
        >

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              Two-Factor Authentication
            </Typography>

            <Switch
              checked={
                security.twoFactor
              }
              onChange={(
                e
              ) =>
                onToggle2FA(
                  e.target.checked
                )
              }
            />
          </Stack>

          <Divider />

          <Typography>
            Last Login
          </Typography>

          <Typography
            color="text.secondary"
          >
            {
              security.lastLogin
            }
          </Typography>

          <Divider />

          <Typography>
            Active Sessions
          </Typography>

          <Typography
            color="text.secondary"
          >
            {
              security.activeSessions
            }
          </Typography>

          <Divider />

          <Button
            variant="contained"
            onClick={onPassword}
          >
            Change Password
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={
              onLogoutAll
            }
          >
            Logout All Devices
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default SecurityCard;