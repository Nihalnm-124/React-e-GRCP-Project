import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplyIcon from "@mui/icons-material/Reply";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useMemo, useState } from "react";

import ApproveDialog from "./ApproveDialog";
import RejectDialog from "./RejectDialog";
import SendBackDialog from "./SendBackDialog";
import DelegateDialog from "./DelegateDialog";

import {
  approveRequest,
  rejectRequest,
  sendBackRequest,
  delegateRequest,
} from "../../services/approvalService";

function ApprovalTable({
  rows,
  refresh,
}) {

  const [page, setPage] =
    useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(5);

  const [orderBy, setOrderBy] =
    useState("title");

  const [order, setOrder] =
    useState("asc");

  const [selected, setSelected] =
    useState(null);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [approveOpen, setApproveOpen] =
    useState(false);

  const [rejectOpen, setRejectOpen] =
    useState(false);

  const [sendBackOpen, setSendBackOpen] =
    useState(false);

  const [delegateOpen, setDelegateOpen] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [snackbar, setSnackbar] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSort = (property) => {

    const asc =
      orderBy === property &&
      order === "asc";

    setOrder(
      asc ? "desc" : "asc"
    );

    setOrderBy(property);

  };

  const sortedRows = useMemo(() => {

    return [...rows].sort((a, b) => {

      let x = a[orderBy];
      let y = b[orderBy];

      if (typeof x === "string") {
        x = x.toLowerCase();
        y = y.toLowerCase();
      }

      if (x < y)
        return order === "asc"
          ? -1
          : 1;

      if (x > y)
        return order === "asc"
          ? 1
          : -1;

      return 0;

    });

  }, [
    rows,
    orderBy,
    order,
  ]);

  const statusColor = (
    status
  ) => {

    switch (status) {

      case "Pending":
        return "warning";

      case "Approved":
        return "success";

      case "Rejected":
        return "error";

      case "Escalated":
        return "secondary";

      default:
        return "default";

    }

  };

  const priorityColor = (
    priority
  ) => {

    switch (priority) {

      case "Critical":
        return "error";

      case "High":
        return "warning";

      case "Medium":
        return "info";

      case "Low":
        return "success";

      default:
        return "default";

    }

  };

  const handleView = (row) => {

    setSelected(row);

    setViewOpen(true);

  };

  const handleApprove = (
    id
  ) => {

    setSelectedId(id);

    setApproveOpen(true);

  };

  const handleReject = (
    id
  ) => {

    setSelectedId(id);

    setRejectOpen(true);

  };

  const handleSendBack = (
    id
  ) => {

    setSelectedId(id);

    setSendBackOpen(true);

  };

  const handleDelegate = (
    id
  ) => {

    setSelectedId(id);

    setDelegateOpen(true);

  };
    const confirmApprove =
    async () => {

      await approveRequest(
        selectedId
      );

      setApproveOpen(false);

      setMessage(
        "Request approved successfully."
      );

      setSnackbar(true);

      refresh();

    };

  const confirmReject =
    async () => {

      await rejectRequest(
        selectedId
      );

      setRejectOpen(false);

      setMessage(
        "Request rejected successfully."
      );

      setSnackbar(true);

      refresh();

    };

  const confirmSendBack =
    async () => {

      await sendBackRequest(
        selectedId
      );

      setSendBackOpen(false);

      setMessage(
        "Request sent back successfully."
      );

      setSnackbar(true);

      refresh();

    };

  const confirmDelegate =
    async (user) => {

      await delegateRequest(
        selectedId,
        user
      );

      setDelegateOpen(false);

      setMessage(
        "Request delegated successfully."
      );

      setSnackbar(true);

      refresh();

    };

  return (

    <>

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                {[
                  "title",
                  "requester",
                  "department",
                  "amount",
                  "priority",
                  "status",
                  "date",
                ].map((column) => (

                  <TableCell
                    key={column}
                  >

                    <TableSortLabel
                      active={
                        orderBy ===
                        column
                      }
                      direction={
                        order
                      }
                      onClick={() =>
                        handleSort(
                          column
                        )
                      }
                    >

                      {column
                        .charAt(0)
                        .toUpperCase() +
                        column.slice(1)}

                    </TableSortLabel>

                  </TableCell>

                ))}

                <TableCell align="center">
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {sortedRows
                .slice(
                  page *
                    rowsPerPage,
                  page *
                    rowsPerPage +
                    rowsPerPage
                )
                .map((row) => (

                  <TableRow
                    hover
                    key={row.id}
                  >

                    <TableCell>
                      {row.title}
                    </TableCell>

                    <TableCell>
                      {row.requester}
                    </TableCell>

                    <TableCell>
                      {row.department}
                    </TableCell>

                    <TableCell>
                      ₹
                      {row.amount.toLocaleString()}
                    </TableCell>

                    <TableCell>

                      <Chip
                        size="small"
                        label={
                          row.priority
                        }
                        color={priorityColor(
                          row.priority
                        )}
                      />

                    </TableCell>

                    <TableCell>

                      <Chip
                        size="small"
                        label={
                          row.status
                        }
                        color={statusColor(
                          row.status
                        )}
                      />

                    </TableCell>

                    <TableCell>
                      {row.date}
                    </TableCell>

                    <TableCell>

                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >

                        <Tooltip title="View">

                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleView(
                                row
                              )
                            }
                          >

                            <VisibilityIcon />

                          </IconButton>

                        </Tooltip>

                        <Tooltip title="Approve">

                          <IconButton
                            color="success"
                            onClick={() =>
                              handleApprove(
                                row.id
                              )
                            }
                          >

                            <CheckCircleIcon />

                          </IconButton>

                        </Tooltip>

                        <Tooltip title="Reject">

                          <IconButton
                            color="error"
                            onClick={() =>
                              handleReject(
                                row.id
                              )
                            }
                          >

                            <CancelIcon />

                          </IconButton>

                        </Tooltip>

                        <Tooltip title="Send Back">

                          <IconButton
                            color="warning"
                            onClick={() =>
                              handleSendBack(
                                row.id
                              )
                            }
                          >

                            <ReplyIcon />

                          </IconButton>

                        </Tooltip>

                        <Tooltip title="Delegate">

                          <IconButton
                            color="secondary"
                            onClick={() =>
                              handleDelegate(
                                row.id
                              )
                            }
                          >

                            <PersonAddIcon />

                          </IconButton>

                        </Tooltip>

                      </Stack>

                    </TableCell>

                  </TableRow>

                ))}

            </TableBody>

          </Table>

        </TableContainer>

        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={
            rowsPerPage
          }
          rowsPerPageOptions={[
            5,
            10,
            20,
          ]}
          onPageChange={(
            e,
            p
          ) =>
            setPage(p)
          }
          onRowsPerPageChange={(
            e
          ) => {
            setRowsPerPage(
              parseInt(
                e.target.value,
                10
              )
            );
            setPage(0);
          }}
        />
                <Dialog
          open={viewOpen}
          onClose={() =>
            setViewOpen(false)
          }
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Approval Details
          </DialogTitle>

          <DialogContent>

            {selected && (

              <Grid
                container
                spacing={2}
                mt={1}
              >

                <Grid item xs={12}>
                  <Typography>
                    <b>Title :</b>{" "}
                    {selected.title}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <b>Requester :</b>{" "}
                    {selected.requester}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <b>Department :</b>{" "}
                    {selected.department}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <b>Amount :</b> ₹
                    {selected.amount.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <b>Priority :</b>{" "}
                    {selected.priority}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <b>Status :</b>{" "}
                    {selected.status}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <b>Date :</b>{" "}
                    {selected.date}
                  </Typography>
                </Grid>

              </Grid>

            )}

          </DialogContent>

          <DialogActions>

            <Button
              onClick={() =>
                setViewOpen(false)
              }
            >
              Close
            </Button>

          </DialogActions>

        </Dialog>

        <ApproveDialog
          open={approveOpen}
          onClose={() =>
            setApproveOpen(false)
          }
          onConfirm={confirmApprove}
        />

        <RejectDialog
          open={rejectOpen}
          onClose={() =>
            setRejectOpen(false)
          }
          onConfirm={confirmReject}
        />

        <SendBackDialog
          open={sendBackOpen}
          onClose={() =>
            setSendBackOpen(false)
          }
          onConfirm={
            confirmSendBack
          }
        />

        <DelegateDialog
          open={delegateOpen}
          onClose={() =>
            setDelegateOpen(false)
          }
          onConfirm={
            confirmDelegate
          }
        />

        <Snackbar
          open={snackbar}
          autoHideDuration={3000}
          onClose={() =>
            setSnackbar(false)
          }
        >
          <Alert
            severity="success"
            variant="filled"
          >
            {message}
          </Alert>
        </Snackbar>

      </Paper>

    </>

  );

}

export default ApprovalTable;