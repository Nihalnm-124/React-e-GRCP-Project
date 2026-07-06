import reports from "../mocks/reports.json";
import savedReports from "../mocks/savedReports.json";
import * as XLSX from "xlsx";

let reportData = [...reports];

let savedReportData = [...savedReports];

// Get All Reports
export const getReports = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...reportData]);
    }, 500);
  });
};

// Get Report By ID
export const getReportById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        reportData.find(
          (report) => report.id === id
        )
      );
    }, 300);
  });
};

// Add Report
export const addReport = (report) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReport = {
        ...report,
        id: Date.now(),
      };

      reportData.unshift(newReport);

      resolve(newReport);
    }, 500);
  });
};

// Update Report
export const updateReport = (
  id,
  updatedReport
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      reportData = reportData.map((report) =>
        report.id === id
          ? {
              ...report,
              ...updatedReport,
            }
          : report
      );

      resolve(true);
    }, 500);
  });
};

// Delete Report
export const deleteReport = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      reportData = reportData.filter(
        (report) => report.id !== id
      );

      resolve(true);
    }, 500);
  });
};

// Search Reports
export const searchReports = (
  keyword
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value =
        keyword.toLowerCase();

      resolve(
        reportData.filter(
          (report) =>
            report.title
              .toLowerCase()
              .includes(value) ||
            report.type
              .toLowerCase()
              .includes(value) ||
            report.generatedBy
              .toLowerCase()
              .includes(value)
        )
      );
    }, 300);
  });
};

// Filter By Status
export const filterReportStatus = (
  status
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status === "All") {
        resolve([...reportData]);
      } else {
        resolve(
          reportData.filter(
            (report) =>
              report.status === status
          )
        );
      }
    }, 300);
  });
};

// Filter By Type
export const filterReportType = (
  type
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === "All") {
        resolve([...reportData]);
      } else {
        resolve(
          reportData.filter(
            (report) =>
              report.type === type
          )
        );
      }
    }, 300);
  });
};

// Dashboard Statistics
export const getReportStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: reportData.length,
        generated: reportData.filter(
          (r) =>
            r.status === "Generated"
        ).length,
        scheduled: reportData.filter(
          (r) =>
            r.status === "Scheduled"
        ).length,
        failed: reportData.filter(
          (r) =>
            r.status === "Failed"
        ).length,
      });
    }, 300);
  });
};

// Monthly Chart Data
export const getMonthlyReportData =
  () => {
    return [
      {
        month: "Jan",
        reports: 12,
      },
      {
        month: "Feb",
        reports: 18,
      },
      {
        month: "Mar",
        reports: 15,
      },
      {
        month: "Apr",
        reports: 22,
      },
      {
        month: "May",
        reports: 28,
      },
      {
        month: "Jun",
        reports: 35,
      },
      {
        month: "Jul",
        reports: 30,
      },
      {
        month: "Aug",
        reports: 40,
      },
    ];
  };

// CSV Export
export const exportReportData =
  () => {
    return [...reportData];
  };

// Excel Export
export const exportExcel = (
  rows,
  fileName = "Report"
) => {

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Reports"
  );

  XLSX.writeFile(
    workbook,
    `${fileName}.xlsx`
  );

};

// Get Saved Reports
export const getSavedReports =
  () => {
    return Promise.resolve([
      ...savedReportData,
    ]);
  };

// Save Report
export const saveReport = (
  report
) => {

  const newReport = {
    id: Date.now(),
    ...report,
    created:
      new Date()
        .toISOString()
        .split("T")[0],
  };

  savedReportData.unshift(
    newReport
  );

  return Promise.resolve(
    newReport
  );

};

// Delete Saved Report
export const deleteSavedReport =
  (id) => {

    savedReportData =
      savedReportData.filter(
        (item) =>
          item.id !== id
      );

    return Promise.resolve(
      true
    );

};