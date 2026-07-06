import { useState } from "react";

import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import ThemeSettings from "./ThemeSettings";

function TabPanel({
  children,
  value,
  index,
}) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box mt={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function SettingsTabs() {

  const [tab, setTab] =
    useState(0);

  return (

    <Box>

      <Tabs
        value={tab}
        onChange={(e, newValue) =>
          setTab(newValue)
        }
        variant="scrollable"
        scrollButtons="auto"
      >

        <Tab label="Profile" />

        <Tab label="Account" />

        <Tab label="Notifications" />

        <Tab label="Security" />

        <Tab label="Theme" />

      </Tabs>

      <TabPanel
        value={tab}
        index={0}
      >
        <ProfileSettings />
      </TabPanel>

      <TabPanel
        value={tab}
        index={1}
      >
        <AccountSettings />
      </TabPanel>

      <TabPanel
        value={tab}
        index={2}
      >
        <NotificationSettings />
      </TabPanel>

      <TabPanel
        value={tab}
        index={3}
      >
        <SecuritySettings />
      </TabPanel>

      <TabPanel
        value={tab}
        index={4}
      >
        <ThemeSettings />
      </TabPanel>

    </Box>

  );

}

export default SettingsTabs;