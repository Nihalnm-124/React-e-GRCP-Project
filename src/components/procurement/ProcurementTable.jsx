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
  Snackbar,
  Alert,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useMemo, useState } from "react";

import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ProcurementDetailsDialog from "./ProcurementDetailsDialog";

import { deleteProcurement } from "../../services/procurementService";

function ProcurementTable({
  rows,
  refresh,
  onEdit,
}) {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(5);

  const [orderBy, setOrderBy] =
    useState("title");

  const [order, setOrder] =
    useState("asc");

  const [
    selectedProcurement,
    setSelectedProcurement,
  ] = useState(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  const [snackbar, setSnackbar] =
    useState(false);

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
  }, [rows, orderBy, order]);

  const handleView = (row) => {
    setSelectedProcurement(row);
    setDetailsOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    await deleteProcurement(deleteId);

    setDeleteOpen(false);

    setSnackbar(true);

    refresh();
  };

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";

      case "Pending":
        return "warning";

      case "Rejected":
        return "error";

      default:
        return "default";
    }
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
                  "vendor",
                  "department",
                  "amount",
                  "status",
                  "date",
                ].map((column) => (
                  <TableCell key={column}>

                    <TableSortLabel
                      active={
                        orderBy === column
                      }
                      direction={order}
                      onClick={() =>
                        handleSort(column)
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
                            {sortedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box
                      py={8}
                      textAlign="center"
                    >
                      <Typography variant="h6">
                        No Procurement Found
                      </Typography>

                      <Typography color="text.secondary">
                        Try another search.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                sortedRows
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage +
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
                        {row.vendor}
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
                          label={row.status}
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

                          <Tooltip title="Edit">
                            <IconButton
                              color="warning"
                              onClick={() =>
                                onEdit(row)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleDeleteClick(
                                  row.id
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              )}

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
          onPageChange={(e, p) =>
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

      </Paper>

      <ProcurementDetailsDialog
        open={detailsOpen}
        onClose={() =>
          setDetailsOpen(false)
        }
        procurement={
          selectedProcurement
        }
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={
          confirmDelete
        }
      />

      <Snackbar
        open={snackbar}
        autoHideDuration={2500}
        onClose={() =>
          setSnackbar(false)
        }
      >
        <Alert
          severity="success"
          variant="filled"
        >
          Procurement deleted
          successfully.
        </Alert>
      </Snackbar>

    </>
  );
}

export default ProcurementTable;