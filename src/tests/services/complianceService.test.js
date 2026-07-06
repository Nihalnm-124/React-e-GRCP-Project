import {
  getCompliances,
  getComplianceById,
  addCompliance,
  updateCompliance,
  deleteCompliance,
  searchCompliance,
  filterComplianceStatus,
  filterFramework,
  exportComplianceData,
} from "../../services/complianceService";

describe("complianceService", () => {

  test("get compliances", async () => {
    const data = await getCompliances();
    expect(Array.isArray(data)).toBe(true);
  });

  test("get by id", async () => {
    const data = await getCompliances();
    const item = await getComplianceById(data[0].id);
    expect(item.id).toBe(data[0].id);
  });

  test("add compliance", async () => {
    const item = await addCompliance({
      policy: "ISO",
      owner: "Admin",
    });

    expect(item.policy).toBe("ISO");
  });

  test("update compliance", async () => {
    const data = await getCompliances();

    expect(
      await updateCompliance(data[0].id, {
        policy: "Updated",
      })
    ).toBe(true);
  });

  test("delete compliance", async () => {
    const data = await getCompliances();
    expect(await deleteCompliance(data[0].id)).toBe(true);
  });

  test("search", async () => {
    expect(Array.isArray(await searchCompliance(""))).toBe(true);
  });

  test("status filter", async () => {
    expect(Array.isArray(await filterComplianceStatus("All"))).toBe(true);
  });

  test("framework filter", async () => {
    expect(Array.isArray(await filterFramework("All"))).toBe(true);
  });

  test("export", () => {
    expect(Array.isArray(exportComplianceData())).toBe(true);
  });

});