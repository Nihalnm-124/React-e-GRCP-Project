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
import DownloadIcon from "@mui/icons-material/Download";

import { useMemo, useState } from "react";

import DeleteReportDialog from "./DeleteReportDialog";

import { deleteReport } from "../../services/reportService";

function ReportsTable({
  rows,
  refresh,
  onEdit,
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

  const handleView = (report) => {

    setSelected(report);

    setViewOpen(true);

  };

  const handleDelete = (id) => {

    setDeleteId(id);

    setDeleteOpen(true);

  };

  const confirmDelete = async () => {

    await deleteReport(deleteId);

    setDeleteOpen(false);

    setSnackbar(true);

    refresh();

  };

  const statusColor = (status) => {

    switch (status) {

      case "Generated":
        return "success";

      case "Scheduled":
        return "warning";

      case "Failed":
        return "error";

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
"title",
"type",
"generatedBy",
"generatedDate",
"status",
"downloads",
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

<TableCell colSpan={7}>

<Box
py={8}
textAlign="center"
>

<Typography variant="h6">
No Reports Found
</Typography>

<Typography color="text.secondary">
Try another filter.
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
.map((report)=>(

<TableRow
hover
key={report.id}
>

<TableCell>

<Typography fontWeight={600}>
{report.title}
</Typography>

</TableCell>

<TableCell>
{report.type}
</TableCell>

<TableCell>
{report.generatedBy}
</TableCell>

<TableCell>
{report.generatedDate}
</TableCell>

<TableCell>

<Chip
label={report.status}
color={statusColor(report.status)}
size="small"
/>

</TableCell>

<TableCell>

<Stack
direction="row"
spacing={1}
alignItems="center"
>

<DownloadIcon
fontSize="small"
/>

<Typography>

{report.downloads}

</Typography>

</Stack>

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
onClick={()=>handleView(report)}
>

<VisibilityIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Edit">

<IconButton
color="warning"
onClick={()=>onEdit(report)}
>

<EditIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Delete">

<IconButton
color="error"
onClick={()=>handleDelete(report.id)}
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
          Report Details
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
                  {selected.title}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Type:</b>{" "}
                  {selected.type}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Generated By:</b>{" "}
                  {selected.generatedBy}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Generated Date:</b>{" "}
                  {selected.generatedDate}
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

              <Grid item xs={12}>
                <Typography
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <DownloadIcon
                    fontSize="small"
                  />

                  <b>Downloads:</b>

                  {selected.downloads}
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

      <DeleteReportDialog
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
          Report deleted successfully.
        </Alert>
      </Snackbar>

    </Paper>

    </>
  );
}

export default ReportsTable;