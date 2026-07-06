import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GavelIcon from "@mui/icons-material/Gavel";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../../store/slices/authSlice";
import { logoutUser } from "../../services/authService";

const drawerWidth = 250;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "Procurement",
    icon: <ShoppingCartIcon />,
    path: "/procurement",
  },
  {
    text: "Vendors",
    icon: <BusinessIcon />,
    path: "/vendors",
  },
  {
    text: "Risk",
    icon: <WarningAmberIcon />,
    path: "/risk",
  },
  {
    text: "Compliance",
    icon: <VerifiedUserIcon />,
    path: "/compliance",
  },
  {
    text: "Audit",
    icon: <GavelIcon />,
    path: "/audit",
  },
  {
    text: "Approval",
    icon: <HowToRegIcon />,
    path: "/approval",
  },
  {
  text: "Notifications",
  icon: <NotificationsIcon />,
  path: "/notifications",
},
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

function Sidebar({
  mobileOpen,
  handleDrawerToggle,
}) {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const theme =
    useTheme();

  const mobile =
    useMediaQuery(
      theme.breakpoints.down("md")
    );

  const handleLogout = () => {

    logoutUser();

    dispatch(logout());

    navigate("/login");

  };

  const drawer = (
    <>

      <Toolbar
        sx={{
          justifyContent: "center",
          minHeight: 72,
        }}
      >

        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
        >
          e-GRCP
        </Typography>

      </Toolbar>

      <Divider />

      <Box
        sx={{
          flexGrow: 1,
          p: 1,
        }}
      >

        <List>

          {menuItems.map(
            (item) => (

              <ListItemButton
                key={item.text}
                component={NavLink}
                to={item.path}
                onClick={() => {

                  if (mobile)
                    handleDrawerToggle();

                }}
                sx={{
                  mb: 1,
                  borderRadius: 2,

                  "&.active": {
                    bgcolor:
                      "primary.main",
                    color: "#fff",
                  },

                  "&.active .MuiListItemIcon-root":
                    {
                      color: "#fff",
                    },

                  "&:hover": {
                    bgcolor:
                      "primary.light",
                    color: "#fff",
                  },

                  "&:hover .MuiListItemIcon-root":
                    {
                      color: "#fff",
                    },
                }}
              >

                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                />

              </ListItemButton>

            )
          )}

        </List>

      </Box>

      <Divider />

      <Box p={1}>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
          }}
        >

          <ListItemIcon>

            <LogoutIcon
              color="error"
            />

          </ListItemIcon>

          <ListItemText
            primary="Logout"
          />

        </ListItemButton>

      </Box>

    </>
  );

  return (
    <>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={
          handleDrawerToggle
        }
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing:
              "border-box",
            borderRight:
              "1px solid rgba(0,0,0,0.12)",
          },
        }}
      >
        {drawer}
      </Drawer>

    </>
  );
}

export default Sidebar;