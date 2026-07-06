import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";

import ProcurementTable from "../../components/procurement/ProcurementTable";
import ProcurementDialog from "../../components/procurement/ProcurementDialog";
import ProcurementToolbar from "../../components/procurement/ProcurementToolbar";

import {
  getProcurements,
  searchProcurements,
  filterProcurements,
  addProcurement,
  updateProcurement,
} from "../../services/procurementService";

function Procurement() {
  const [loading, setLoading] = useState(true);

  const [procurements, setProcurements] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [selected, setSelected] =
    useState(null);

  const [snackbar, setSnackbar] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const data =
      await getProcurements();

    setProcurements(data);

    setLoading(false);
  }

  async function handleSearch(value) {
    setSearch(value);

    if (value.trim() === "") {
      loadData();
      return;
    }

    const result =
      await searchProcurements(value);

    setProcurements(result);
  }

  async function handleFilter(value) {
    setStatus(value);

    const result =
      await filterProcurements(value);

    setProcurements(result);
  }

  function handleAdd() {
    setSelected(null);
    setOpenDialog(true);
  }

  function handleEdit(item) {
    setSelected(item);
    setOpenDialog(true);
  }

  async function handleSave(data) {
    if (selected) {
      await updateProcurement(
        selected.id,
        data
      );

      setMessage(
        "Procurement updated successfully."
      );
    } else {
      await addProcurement(data);

      setMessage(
        "Procurement added successfully."
      );
    }

    setOpenDialog(false);

    setSnackbar(true);

    loadData();
  }

  function exportCSV() {
  const headers = [
    "Procurement ID",
    "Title",
    "Vendor",
    "Department",
    "Amount",
    "Status",
    "Date",
  ];

  const csvRows = procurements.map((item) => [
    item.id,
    item.title,
    item.vendor,
    item.department,
    item.amount,
    item.status,
    item.date,
  ]);

  const csvContent =
    "\uFEFF" +
    [headers, ...csvRows]
      .map((row) =>
        row
          .map((value) => {
            if (value === null || value === undefined)
              return "";

            const text = String(value).replace(/"/g, '""');

            return `"${text}"`;
          })
          .join(",")
      )
      .join("\r\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "procurements.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Procurement
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >

        <ProcurementToolbar
          search={search}
          status={status}
          onSearch={handleSearch}
          onStatusChange={handleFilter}
          onAdd={handleAdd}
          onExport={exportCSV}
        />

      </Paper>

      {loading ? (
        <Skeleton
          variant="rounded"
          height={450}
        />
      ) : (
        <ProcurementTable
          rows={procurements}
          refresh={loadData}
          onEdit={handleEdit}
        />
      )}

      <ProcurementDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        selected={selected}
        onSave={handleSave}
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

    </Box>
  );
}

export default Procurement;