import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import StarIcon from "@mui/icons-material/Star";

import VendorToolbar from "../../components/vendors/VendorToolbar";
import VendorTable from "../../components/vendors/VendorTable";
import VendorDialog from "../../components/vendors/VendorDialog";
import VendorStatCard from "../../components/vendors/VendorStatCard";

import {
  getVendors,
  searchVendors,
  filterVendors,
  filterRisk,
  addVendor,
  updateVendor,
} from "../../services/vendorService";

function Vendors() {
  const [loading, setLoading] =
    useState(true);

  const [vendors, setVendors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [risk, setRisk] =
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
      await getVendors();

    setVendors(data);

    setLoading(false);
  }

  async function handleSearch(value) {
    setSearch(value);

    if (value.trim() === "") {
      loadData();
      return;
    }

    const data =
      await searchVendors(value);

    setVendors(data);
  }

  async function handleStatus(statusValue) {
    setStatus(statusValue);

    const data =
      await filterVendors(statusValue);

    setVendors(data);
  }

  async function handleRisk(riskValue) {
    setRisk(riskValue);

    const data =
      await filterRisk(riskValue);

    setVendors(data);
  }

  function handleAdd() {
    setSelected(null);
    setOpenDialog(true);
  }

  function handleEdit(vendor) {
    setSelected(vendor);
    setOpenDialog(true);
  }

  async function handleSave(data) {
    if (selected) {
      await updateVendor(
        selected.id,
        data
      );

      setMessage(
        "Vendor updated successfully."
      );
    } else {
      await addVendor(data);

      setMessage(
        "Vendor added successfully."
      );
    }

    setOpenDialog(false);

    setSnackbar(true);

    loadData();
  }

  function exportCSV() {
    const headers = [
      "Vendor ID",
      "Company",
      "Contact",
      "Email",
      "Phone",
      "Country",
      "Category",
      "Rating",
      "Risk",
      "Status",
    ];

    const csvRows =
      vendors.map((item) => [
        item.id,
        item.company,
        item.contact,
        item.email,
        item.phone,
        item.country,
        item.category,
        item.rating,
        item.risk,
        item.status,
      ]);

    const csv =
      "\uFEFF" +
      [headers, ...csvRows]
        .map((row) =>
          row
            .map((v) => `"${v}"`)
            .join(",")
        )
        .join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "vendors.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  const totalVendors =
    vendors.length;

  const activeVendors =
    vendors.filter(
      (v) => v.status === "Active"
    ).length;

  const highRiskVendors =
    vendors.filter(
      (v) => v.risk === "High"
    ).length;

  const averageRating =
    vendors.length === 0
      ? 0
      : (
          vendors.reduce(
            (sum, v) =>
              sum + Number(v.rating),
            0
          ) / vendors.length
        ).toFixed(1);

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Vendor Governance
      </Typography>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <VendorStatCard
            title="Total Vendors"
            value={totalVendors}
            icon={<BusinessIcon />}
            color="#1976d2"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <VendorStatCard
            title="Active Vendors"
            value={activeVendors}
            icon={<CheckCircleIcon />}
            color="#2e7d32"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <VendorStatCard
            title="High Risk"
            value={highRiskVendors}
            icon={<WarningAmberIcon />}
            color="#ed6c02"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <VendorStatCard
            title="Average Rating"
            value={averageRating}
            icon={<StarIcon />}
            color="#8e24aa"
          />
        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <VendorToolbar
          search={search}
          status={status}
          risk={risk}
          onSearch={handleSearch}
          onStatusChange={handleStatus}
          onRiskChange={handleRisk}
          onAdd={handleAdd}
          onExport={exportCSV}
        />
      </Paper>

      {loading ? (
        <Skeleton
          variant="rounded"
          height={500}
        />
      ) : (
        <VendorTable
          rows={vendors}
          refresh={loadData}
          onEdit={handleEdit}
        />
      )}

      <VendorDialog
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

export default Vendors;