import * as XLSX from "xlsx";

import {
  getReports,
  getReportById,
  addReport,
  updateReport,
  deleteReport,
  searchReports,
  filterReportStatus,
  filterReportType,
  getReportStats,
  getMonthlyReportData,
  exportReportData,
  exportExcel,
  getSavedReports,
  saveReport,
  deleteSavedReport,
} from "../../services/reportService";

describe("reportService", () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should fetch all reports", async () => {

    const reports = await getReports();

    expect(Array.isArray(reports)).toBe(true);

    expect(reports.length).toBeGreaterThan(0);

  });

  test("should fetch report by id", async () => {

    const reports = await getReports();

    const report = await getReportById(
      reports[0].id
    );

    expect(report.id).toBe(
      reports[0].id
    );

  });

  test("should add report", async () => {

    const report = {

      title: "Annual Report",

      type: "Compliance",

      generatedBy: "Admin",

      status: "Generated",

    };

    const result =
      await addReport(report);

    expect(result.title).toBe(
      "Annual Report"
    );

  });

  test("should update report", async () => {

    const reports = await getReports();

    const result =
      await updateReport(
        reports[0].id,
        {
          title: "Updated Report",
        }
      );

    expect(result).toBe(true);

  });

  test("should delete report", async () => {

    const reports = await getReports();

    const result =
      await deleteReport(
        reports[0].id
      );

    expect(result).toBe(true);

  });

  test("should search reports", async () => {

    const result =
      await searchReports("");

    expect(
      Array.isArray(result)
    ).toBe(true);

  });

  test("should filter reports by status", async () => {

    const result =
      await filterReportStatus(
        "All"
      );

    expect(
      Array.isArray(result)
    ).toBe(true);

  });

  test("should filter reports by type", async () => {

    const result =
      await filterReportType(
        "All"
      );

    expect(
      Array.isArray(result)
    ).toBe(true);

  });

  test("should return report stats", async () => {

    const stats =
      await getReportStats();

    expect(stats).toHaveProperty(
      "total"
    );

    expect(stats).toHaveProperty(
      "generated"
    );

    expect(stats).toHaveProperty(
      "scheduled"
    );

    expect(stats).toHaveProperty(
      "failed"
    );

  });

  test("should return monthly report data", () => {

    const data =
      getMonthlyReportData();

    expect(
      Array.isArray(data)
    ).toBe(true);

    expect(data.length).toBe(8);

  });

  test("should export report data", () => {

    const data =
      exportReportData();

    expect(
      Array.isArray(data)
    ).toBe(true);

  });

  test("should execute export excel without error", () => {

  expect(() =>

    exportExcel(
      [
        {
          title: "Demo",
        },
      ],
      "TestReport"
    )

  ).not.toThrow();

});

  test("should get saved reports", async () => {

    const reports =
      await getSavedReports();

    expect(
      Array.isArray(reports)
    ).toBe(true);

  });

  test("should save report", async () => {

    const report =
      await saveReport({

        title: "Saved Report",

        type: "Risk",

      });

    expect(report.title).toBe(
      "Saved Report"
    );

    expect(report).toHaveProperty(
      "id"
    );

  });

  test("should delete saved report", async () => {

    const result =
      await deleteSavedReport(
        999999
      );

    expect(result).toBe(true);

  });

});