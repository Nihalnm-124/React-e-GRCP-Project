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

import DeleteRiskDialog from "./DeleteRiskDialog";

import { deleteRisk } from "../../services/riskService";

function RiskTable({
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

    return [...rows].sort((a,b)=>{

      let x=a[orderBy];
      let y=b[orderBy];

      if(typeof x==="string"){

        x=x.toLowerCase();

        y=y.toLowerCase();

      }

      if(x<y)
        return order==="asc"
          ?-1
          :1;

      if(x>y)
        return order==="asc"
          ?1
          :-1;

      return 0;

    });

  },[rows,orderBy,order]);

  const handleView=(risk)=>{

    setSelected(risk);

    setViewOpen(true);

  };

  const handleDelete=(id)=>{

    setDeleteId(id);

    setDeleteOpen(true);

  };

  const confirmDelete=async()=>{

    await deleteRisk(deleteId);

    setDeleteOpen(false);

    setSnackbar(true);

    refresh();

  };

  const severityColor=(severity)=>{

    switch(severity){

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

  const statusColor=(status)=>{

    switch(status){

      case "Open":
        return "error";

      case "Mitigated":
        return "warning";

      case "Closed":
        return "success";

      default:
        return "default";

    }

  };

  return(

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
"owner",
"category",
"score",
"severity",
"status",
"dueDate",
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
No Risks Found
</Typography>

<Typography
color="text.secondary"
>
Try another search.
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
.map((risk)=>(

<TableRow
hover
key={risk.id}
>

<TableCell>
{risk.title}
</TableCell>

<TableCell>
{risk.owner}
</TableCell>

<TableCell>
{risk.category}
</TableCell>

<TableCell>

<Typography
fontWeight="bold"
color="primary"
>

{risk.score}

</Typography>

</TableCell>

<TableCell>

<Chip
label={risk.severity}
color={severityColor(risk.severity)}
size="small"
/>

</TableCell>

<TableCell>

<Chip
label={risk.status}
color={statusColor(risk.status)}
size="small"
/>

</TableCell>

<TableCell>
{risk.dueDate}
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
onClick={()=>handleView(risk)}
>

<VisibilityIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Edit">

<IconButton
color="warning"
onClick={()=>onEdit(risk)}
>

<EditIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Delete">

<IconButton
color="error"
onClick={()=>handleDelete(risk.id)}
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
          Risk Details
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
                  <b>Owner:</b>{" "}
                  {selected.owner}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Category:</b>{" "}
                  {selected.category}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Probability:</b>{" "}
                  {selected.probability}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Impact:</b>{" "}
                  {selected.impact}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Risk Score:</b>{" "}
                  {selected.score}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <b>Severity:</b>

                  <Chip
                    label={selected.severity}
                    color={severityColor(
                      selected.severity
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
                  <b>Due Date:</b>{" "}
                  {selected.dueDate}
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

      <DeleteRiskDialog
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
          Risk deleted successfully.
        </Alert>
      </Snackbar>

    </Paper>

    </>
  );
}

export default RiskTable;

      