import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import { useThemeContext } from "../../context/ThemeContext";

const drawerWidth = 250;

function Header({ handleDrawerToggle }) {
  const theme = useTheme();

  const { mode, toggleTheme } =
    useThemeContext();

  const user = useSelector(
    (state) => state.auth.user
  );

  const [
    notificationAnchor,
    setNotificationAnchor,
  ] = useState(null);

  const [
    profileAnchor,
    setProfileAnchor,
  ] = useState(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },

        ml: {
          md: `${drawerWidth}px`,
        },

        backdropFilter: "blur(12px)",

        background:
          theme.palette.mode ===
          "light"
            ? "rgba(255,255,255,.88)"
            : "rgba(15,23,42,.88)",

        color: "text.primary",

        borderBottom:
          "1px solid rgba(0,0,0,.08)",

        zIndex:
          theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            mr: 2,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            e-GRCP Portal
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Governance • Risk • Compliance
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            mr: 4,

            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {new Date().toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search modules..."
          sx={{
            width: 300,

            mr: 3,

            display: {
              xs: "none",
              md: "block",
            },

            "& .MuiOutlinedInput-root":
              {
                borderRadius: 3,
                background:
                  "background.paper",
              },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title="Toggle Theme">
          <IconButton
            onClick={toggleTheme}
            sx={{
              mr: 1,

              bgcolor: "action.hover",

              transition: ".3s",

              "&:hover": {
                bgcolor:
                  "primary.main",
                color: "#fff",
              },
            }}
          >
            {mode === "light" ? (
              <Brightness4Icon />
            ) : (
              <Brightness7Icon />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton
            onClick={(e) =>
              setNotificationAnchor(
                e.currentTarget
              )
            }
            sx={{
              mr: 1,

              bgcolor: "action.hover",

              transition: ".3s",

              "&:hover": {
                bgcolor:
                  "primary.main",
                color: "#fff",
              },
            }}
          >
            <Badge
              badgeContent={4}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(
            notificationAnchor
          )}
          onClose={() =>
            setNotificationAnchor(null)
          }
        >
          <MenuItem>
            Vendor ABC Registered
          </MenuItem>

          <MenuItem>
            Procurement Approved
          </MenuItem>

          <MenuItem>
            Risk Updated
          </MenuItem>

          <MenuItem>
            Audit Completed
          </MenuItem>
        </Menu>

        <Box
          onClick={(e) =>
            setProfileAnchor(
              e.currentTarget
            )
          }
          sx={{
            display: "flex",

            alignItems: "center",

            ml: 2,

            cursor: "pointer",
          }}
        >
          <Avatar
            sx={{
              width: 42,

              height: 42,

              bgcolor:
                theme.palette.primary
                  .main,

              fontWeight: 700,
            }}
          >
            {user?.name?.charAt(0) ||
              "A"}
          </Avatar>

          <Box
            sx={{
              ml: 2,

              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Typography
              fontWeight={700}
            >
              Welcome,{" "}
              {user?.name ||
                "Administrator"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {user?.role ||
                "System Admin"}
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() =>
            setProfileAnchor(null)
          }
        >
          <MenuItem>
            <AccountCircleIcon
              sx={{ mr: 1 }}
            />
            My Profile
          </MenuItem>

          <MenuItem>
            <SettingsIcon
              sx={{ mr: 1 }}
            />
            Settings
          </MenuItem>

          <Divider />

          <MenuItem>
            <HelpOutlineIcon
              sx={{ mr: 1 }}
            />
            Help
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;