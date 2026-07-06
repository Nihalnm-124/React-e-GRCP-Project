import {
  getAudits,
  getAuditById,
  addAudit,
  updateAudit,
  deleteAudit,
  searchAudits,
  filterAuditStatus,
  filterAuditor,
  exportAuditData,
} from "../../services/auditService";

describe("auditService", () => {

  test("get audits", async () => {
    const data = await getAudits();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("get audit by id", async () => {
    const data = await getAudits();
    const audit = await getAuditById(data[0].id);
    expect(audit.id).toBe(data[0].id);
  });

  test("add audit", async () => {
    const result = await addAudit({
      auditName: "ISO Audit",
      auditor: "Admin",
    });

    expect(result.auditName).toBe("ISO Audit");
  });

  test("update audit", async () => {
    const data = await getAudits();

    expect(
      await updateAudit(data[0].id, {
        auditName: "Updated",
      })
    ).toBe(true);
  });

  test("delete audit", async () => {
    const data = await getAudits();
    expect(await deleteAudit(data[0].id)).toBe(true);
  });

  test("search audits", async () => {
    expect(Array.isArray(await searchAudits(""))).toBe(true);
  });

  test("filter status", async () => {
    expect(Array.isArray(await filterAuditStatus("All"))).toBe(true);
  });

  test("filter auditor", async () => {
    expect(Array.isArray(await filterAuditor("All"))).toBe(true);
  });

  test("export", () => {
    expect(Array.isArray(exportAuditData())).toBe(true);
  });

});