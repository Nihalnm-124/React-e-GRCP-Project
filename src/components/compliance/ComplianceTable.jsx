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

import DeleteComplianceDialog from "./DeleteComplianceDialog";

import { deleteCompliance } from "../../services/complianceService";

function ComplianceTable({
  rows,
  refresh,
  onEdit,
}) {

  const [page,setPage]=useState(0);

  const [rowsPerPage,setRowsPerPage]=
    useState(5);

  const [orderBy,setOrderBy]=
    useState("policy");

  const [order,setOrder]=
    useState("asc");

  const [selected,setSelected]=
    useState(null);

  const [viewOpen,setViewOpen]=
    useState(false);

  const [deleteOpen,setDeleteOpen]=
    useState(false);

  const [deleteId,setDeleteId]=
    useState(null);

  const [snackbar,setSnackbar]=
    useState(false);

  const handleSort=(property)=>{

    const asc=
      orderBy===property &&
      order==="asc";

    setOrder(
      asc?"desc":"asc"
    );

    setOrderBy(property);

  };

  const sortedRows=useMemo(()=>{

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

  const handleView=(row)=>{

    setSelected(row);

    setViewOpen(true);

  };

  const handleDelete=(id)=>{

    setDeleteId(id);

    setDeleteOpen(true);

  };

  const confirmDelete=async()=>{

    await deleteCompliance(deleteId);

    setDeleteOpen(false);

    setSnackbar(true);

    refresh();

  };

  const statusColor=(status)=>{

    switch(status){

      case "Compliant":
        return "success";

      case "In Review":
        return "warning";

      case "Non-Compliant":
        return "error";

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
"policy",
"framework",
"owner",
"status",
"reviewDate",
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

<TableCell colSpan={6}>

<Box
py={8}
textAlign="center"
>

<Typography variant="h6">
No Compliance Records
</Typography>

<Typography
color="text.secondary"
>
No records found.
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
.map((item)=>(

<TableRow
hover
key={item.id}
>

<TableCell>

<Typography
fontWeight={600}
>
{item.policy}
</Typography>

<Typography
variant="body2"
color="text.secondary"
>
{item.control}
</Typography>

</TableCell>

<TableCell>
{item.framework}
</TableCell>

<TableCell>
{item.owner}
</TableCell>

<TableCell>

<Chip
label={item.status}
color={statusColor(item.status)}
size="small"
/>

</TableCell>

<TableCell>
{item.reviewDate}
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
onClick={()=>handleView(item)}
>

<VisibilityIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Edit">

<IconButton
color="warning"
onClick={()=>onEdit(item)}
>

<EditIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Delete">

<IconButton
color="error"
onClick={()=>handleDelete(item.id)}
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
          Compliance Details
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
                  {selected.policy}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <b>Control:</b>{" "}
                  {selected.control}
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
                  <b>Framework:</b>{" "}
                  {selected.framework}
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
                  <b>Review Date:</b>{" "}
                  {selected.reviewDate}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  <b>Evidence:</b>{" "}
                  {selected.evidence}
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

      <DeleteComplianceDialog
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
          Compliance deleted successfully.
        </Alert>
      </Snackbar>

    </Paper>

    </>
  );
}

export default ComplianceTable;