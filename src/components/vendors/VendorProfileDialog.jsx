import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Rating,
} from "@mui/material";

import { useState } from "react";

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

function VendorProfileDialog({
  open,
  onClose,
  vendor,
}) {
  const [tab, setTab] =
    useState(0);

  if (!vendor) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Vendor Profile
      </DialogTitle>

      <DialogContent>

        <Tabs
          value={tab}
          onChange={(e, value) =>
            setTab(value)
          }
          variant="scrollable"
        >
          <Tab label="Basic Details" />
          <Tab label="Contacts" />
          <Tab label="Documents" />
          <Tab label="Risk Information" />
          <Tab label="History" />
        </Tabs>

        <TabPanel
          value={tab}
          index={0}
        >
          <Table>
            <TableBody>

              <TableRow>
                <TableCell>
                  <b>Company</b>
                </TableCell>
                <TableCell>
                  {vendor.company}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Category</b>
                </TableCell>
                <TableCell>
                  {vendor.category}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Country</b>
                </TableCell>
                <TableCell>
                  {vendor.country}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <Chip
                    label={vendor.status}
                    color={
                      vendor.status ===
                      "Active"
                        ? "success"
                        : vendor.status ===
                          "Pending"
                        ? "warning"
                        : "error"
                    }
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Rating</b>
                </TableCell>
                <TableCell>
                  <Rating
                    value={vendor.rating}
                    precision={0.5}
                    readOnly
                  />
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TabPanel>

        <TabPanel
          value={tab}
          index={1}
        >
          <List>

            <ListItem>
              <ListItemText
                primary={vendor.contact}
                secondary={vendor.email}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary={vendor.phone}
                secondary="Primary Contact Number"
              />
            </ListItem>

          </List>
        </TabPanel>

        <TabPanel
          value={tab}
          index={2}
        >
          <List>

            <ListItem>
              <ListItemText
                primary="GST Certificate.pdf"
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="ISO Certificate.pdf"
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Company Registration.pdf"
              />
            </ListItem>

          </List>
        </TabPanel>

        <TabPanel
          value={tab}
          index={3}
        >
          <Typography
            gutterBottom
          >
            Risk Level
          </Typography>

          <Chip
            label={vendor.risk}
            color={
              vendor.risk ===
              "High"
                ? "error"
                : vendor.risk ===
                  "Medium"
                ? "warning"
                : "success"
            }
          />

          <Typography mt={3}>
            Overall Risk Score :
            {" "}
            {vendor.risk ===
            "High"
              ? 90
              : vendor.risk ===
                "Medium"
              ? 65
              : 30}
            %
          </Typography>
        </TabPanel>

        <TabPanel
          value={tab}
          index={4}
        >
          <List>

            <ListItem>
              <ListItemText
                primary="Vendor Registered"
                secondary="12 Jan 2026"
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Documents Verified"
                secondary="18 Feb 2026"
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Latest Assessment"
                secondary="22 Jun 2026"
              />
            </ListItem>

          </List>
        </TabPanel>

      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default VendorProfileDialog;