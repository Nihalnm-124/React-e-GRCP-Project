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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useMemo, useState } from "react";

import DeleteAuditDialog from "./DeleteAuditDialog";

import { deleteAudit } from "../../services/auditService";

function AuditTable({
  rows,
  refresh,
  onEdit,
}) {

  const [page, setPage] =
    useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(5);

  const [orderBy, setOrderBy] =
    useState("auditName");

  const [order, setOrder] =
    useState("asc");

  const [selected, setSelected] =
    useState(null);

  const [viewOpen, setViewOpen] =
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

  const handleView = (audit) => {

    setSelected(audit);

    setViewOpen(true);

  };

  const handleDelete = (id) => {

    setDeleteId(id);

    setDeleteOpen(true);

  };

  const confirmDelete = async () => {

    await deleteAudit(deleteId);

    setDeleteOpen(false);

    setSnackbar(true);

    refresh();

  };

  const statusColor = (status) => {

    switch (status) {

      case "Completed":
        return "success";

      case "In Progress":
        return "warning";

      case "Scheduled":
        return "info";

      default:
        return "default";

    }

  };

  const priorityColor = (priority) => {

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

  return (

<>
<Paper
sx={{
borderRadius:3,
overflow:"hidden",
}}
>

<TableContainer>

<Table>

<TableHead>

<TableRow>

{[
"auditName",
"auditor",
"department",
"priority",
"status",
"startDate",
"endDate",
].map((column)=>(

<TableCell key={column}>

<TableSortLabel
active={orderBy===column}
direction={order}
onClick={()=>handleSort(column)}
>

{column.charAt(0).toUpperCase()+column.slice(1)}

</TableSortLabel>

</TableCell>

))}

<TableCell align="center">
Actions
</TableCell>

</TableRow>

</TableHead>

<TableBody>

{sortedRows.length===0?(

<TableRow>

<TableCell colSpan={8}>

<Box
py={8}
textAlign="center"
>

<Typography variant="h6">
No Audits Found
</Typography>

<Typography color="text.secondary">
Try changing filters.
</Typography>

</Box>

</TableCell>

</TableRow>

):(

sortedRows
.slice(
page*rowsPerPage,
page*rowsPerPage+rowsPerPage
)
.map((audit)=>(

<TableRow
hover
key={audit.id}
>

<TableCell>

<Typography fontWeight={600}>
{audit.auditName}
</Typography>

</TableCell>

<TableCell>
{audit.auditor}
</TableCell>

<TableCell>
{audit.department}
</TableCell>

<TableCell>

<Chip
label={audit.priority}
color={priorityColor(audit.priority)}
size="small"
/>

</TableCell>

<TableCell>

<Chip
label={audit.status}
color={statusColor(audit.status)}
size="small"
/>

</TableCell>

<TableCell>
{audit.startDate}
</TableCell>

<TableCell>
{audit.endDate}
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
onClick={()=>handleView(audit)}
>

<VisibilityIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Edit">

<IconButton
color="warning"
onClick={()=>onEdit(audit)}
>

<EditIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Delete">

<IconButton
color="error"
onClick={()=>handleDelete(audit.id)}
>

<DeleteIcon/>

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
rowsPerPage={rowsPerPage}
rowsPerPageOptions={[5,10,20]}
onPageChange={(e,p)=>setPage(p)}
onRowsPerPageChange={(e)=>{
setRowsPerPage(parseInt(e.target.value,10));
setPage(0);
}}
/>

      <Dialog
        open={viewOpen}
        onClose={() =>
          setViewOpen(false)
        }
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Audit Details
        </DialogTitle>

        <DialogContent>

          {selected && (

            <Grid
              container
              spacing={2}
              mt={1}
            >

              <Grid item xs={12}>
                <Typography variant="h6">
                  {selected.auditName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Auditor:</b>{" "}
                  {selected.auditor}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Department:</b>{" "}
                  {selected.department}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <b>Priority:</b>

                  <Chip
                    label={selected.priority}
                    color={priorityColor(
                      selected.priority
                    )}
                    size="small"
                  />

                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <b>Status:</b>

                  <Chip
                    label={selected.status}
                    color={statusColor(
                      selected.status
                    )}
                    size="small"
                  />

                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Start Date:</b>{" "}
                  {selected.startDate}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>End Date:</b>{" "}
                  {selected.endDate}
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

      <DeleteAuditDialog
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
          Audit deleted successfully.
        </Alert>
      </Snackbar>

    </Paper>

    </>
  );
}

export default AuditTable;