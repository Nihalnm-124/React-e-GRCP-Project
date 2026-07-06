import { Box, Toolbar, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const drawerWidth = 250;

function MainLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={
          handleDrawerToggle
        }
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            md: `${drawerWidth}px`,
          },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          handleDrawerToggle={
            handleDrawerToggle
          }
        />

        <Toolbar />

        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default MainLayout;