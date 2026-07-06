import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  List,
  ListItem,
  ListItemText,
  Divider,
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

function ProcurementDetailsDialog({
  open,
  onClose,
  procurement,
}) {
  const [tab, setTab] =
    useState(0);

  if (!procurement) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Procurement Details
      </DialogTitle>

      <DialogContent>

        <Tabs
          value={tab}
          onChange={(e, value) =>
            setTab(value)
          }
          variant="scrollable"
        >
          <Tab label="Overview" />
          <Tab label="Attachments" />
          <Tab label="Approval History" />
          <Tab label="Comments" />
          <Tab label="Audit Logs" />
        </Tabs>

        <TabPanel
          value={tab}
          index={0}
        >
          <Table>
            <TableBody>

              <TableRow>
                <TableCell>
                  <b>Title</b>
                </TableCell>
                <TableCell>
                  {procurement.title}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Vendor</b>
                </TableCell>
                <TableCell>
                  {procurement.vendor}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Department</b>
                </TableCell>
                <TableCell>
                  {procurement.department}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Amount</b>
                </TableCell>
                <TableCell>
                  ₹
                  {procurement.amount.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  {procurement.status}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <b>Date</b>
                </TableCell>
                <TableCell>
                  {procurement.date}
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
                primary="Quotation.pdf"
                secondary="Uploaded by Procurement Team"
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="ApprovalLetter.pdf"
                secondary="Finance Department"
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
                primary="Manager Approval"
                secondary="Approved • 20 Jun 2026"
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Finance Approval"
                secondary="Approved • 21 Jun 2026"
              />
            </ListItem>

          </List>
        </TabPanel>

        <TabPanel
          value={tab}
          index={3}
        >
          <List>

            <ListItem>
              <ListItemText
                primary="Vendor quotation verified."
                secondary="John • Yesterday"
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Finance approved budget."
                secondary="Finance Team • Today"
              />
            </ListItem>

          </List>
        </TabPanel>

        <TabPanel
          value={tab}
          index={4}
        >
          <Grid
            container
            spacing={2}
          >

            <Grid item xs={12}>
              <Typography>
                • Procurement Created
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                • Vendor Assigned
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                • Manager Approved
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                • Finance Approved
              </Typography>
            </Grid>

          </Grid>
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

export default ProcurementDetailsDialog;