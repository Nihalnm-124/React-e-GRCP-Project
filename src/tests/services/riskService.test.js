import {
  getRisks,
  getRiskById,
  addRisk,
  updateRisk,
  deleteRisk,
  searchRisks,
  filterSeverity,
  filterRiskStatus,
  exportRiskData,
} from "../../services/riskService";

describe("riskService", () => {

  test("get risks", async () => {
    const data = await getRisks();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("get risk by id", async () => {
    const data = await getRisks();
    const risk = await getRiskById(data[0].id);
    expect(risk.id).toBe(data[0].id);
  });

  test("add risk", async () => {
    const result = await addRisk({
      title: "Risk",
      probability: 5,
      impact: 4,
    });

    expect(result.score).toBe(20);
  });

  test("update risk", async () => {
    const data = await getRisks();

    const result = await updateRisk(
      data[0].id,
      {
        probability: 2,
        impact: 5,
      }
    );

    expect(result).toBe(true);
  });

  test("delete risk", async () => {
    const data = await getRisks();
    expect(await deleteRisk(data[0].id)).toBe(true);
  });

  test("search", async () => {
    expect(Array.isArray(await searchRisks(""))).toBe(true);
  });

  test("severity filter", async () => {
    expect(Array.isArray(await filterSeverity("All"))).toBe(true);
  });

  test("status filter", async () => {
    expect(Array.isArray(await filterRiskStatus("All"))).toBe(true);
  });

  test("export", () => {
    expect(Array.isArray(exportRiskData())).toBe(true);
  });

});