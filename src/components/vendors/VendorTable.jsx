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
  Rating,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useMemo, useState } from "react";

import DeleteVendorDialog from "./DeleteVendorDialog";
import VendorProfileDialog from "./VendorProfileDialog";

import { deleteVendor } from "../../services/vendorService";

function VendorTable({
  rows,
  refresh,
  onEdit,
}) {
  const [page, setPage] =
    useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(5);

  const [orderBy, setOrderBy] =
    useState("company");

  const [order, setOrder] =
    useState("asc");

  const [
    selectedVendor,
    setSelectedVendor,
  ] = useState(null);

  const [profileOpen, setProfileOpen] =
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

      if (
        typeof x === "string"
      ) {
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

  const handleView = (
    vendor
  ) => {
    setSelectedVendor(vendor);
    setProfileOpen(true);
  };

  const handleDeleteClick = (
    id
  ) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete =
    async () => {
      await deleteVendor(
        deleteId
      );

      setDeleteOpen(false);

      setSnackbar(true);

      refresh();
    };

  const statusColor = (
    status
  ) => {
    switch (status) {
      case "Active":
        return "success";

      case "Pending":
        return "warning";

      case "Inactive":
        return "error";

      default:
        return "default";
    }
  };

  const riskColor = (
    risk
  ) => {
    switch (risk) {
      case "Low":
        return "success";

      case "Medium":
        return "warning";

      case "High":
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
                  "company",
                  "contact",
                  "country",
                  "category",
                  "rating",
                  "risk",
                  "status",
                ].map(
                  (column) => (
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
                          column.slice(
                            1
                          )}
                      </TableSortLabel>
                    </TableCell>
                  )
                )}

                <TableCell align="center">
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>
                            {sortedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Box
                      py={8}
                      textAlign="center"
                    >
                      <Typography variant="h6">
                        No Vendors Found
                      </Typography>

                      <Typography color="text.secondary">
                        Try changing filters.
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
                  .map((vendor) => (
                    <TableRow
                      hover
                      key={vendor.id}
                    >
                      <TableCell>
                        <Typography fontWeight={600}>
                          {vendor.company}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {vendor.email}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>
                          {vendor.contact}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {vendor.phone}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {vendor.country}
                      </TableCell>

                      <TableCell>
                        {vendor.category}
                      </TableCell>

                      <TableCell>
                        <Rating
                          value={vendor.rating}
                          precision={0.5}
                          readOnly
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={vendor.risk}
                          color={riskColor(
                            vendor.risk
                          )}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={vendor.status}
                          color={statusColor(
                            vendor.status
                          )}
                          size="small"
                        />
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
                                  vendor
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
                                onEdit(
                                  vendor
                                )
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
                                  vendor.id
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
            <VendorProfileDialog
        open={profileOpen}
        onClose={() =>
          setProfileOpen(false)
        }
        vendor={selectedVendor}
      />

      <DeleteVendorDialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={confirmDelete}
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
          Vendor deleted successfully.
        </Alert>
      </Snackbar>

    </>
  );
}

export default VendorTable;