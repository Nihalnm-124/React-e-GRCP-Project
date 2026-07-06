export function exportProcurementCSV(rows) {
  const headers = [
    "Title",
    "Vendor",
    "Department",
    "Amount",
    "Status",
    "Date",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      [
        row.title,
        row.vendor,
        row.department,
        row.amount,
        row.status,
        row.date,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "Procurements.csv";

  link.click();

  window.URL.revokeObjectURL(url);
}