import {
  getProcurements,
  getProcurementById,
  addProcurement,
  updateProcurement,
  deleteProcurement,
  searchProcurements,
  filterProcurements,
} from "../../services/procurementService";

describe("procurementService", () => {

  test("get procurements", async () => {
    const data = await getProcurements();
    expect(Array.isArray(data)).toBe(true);
  });

  test("get procurement by id", async () => {
    const data = await getProcurements();
    const item = await getProcurementById(data[0].id);
    expect(item.id).toBe(data[0].id);
  });

  test("add procurement", async () => {
    const item = await addProcurement({
      title: "Laptop",
      vendor: "Dell",
    });

    expect(item.title).toBe("Laptop");
  });

  test("update procurement", async () => {
    const data = await getProcurements();

    expect(
      await updateProcurement(
        data[0].id,
        {
          title: "Updated",
        }
      )
    ).toBe(true);
  });

  test("delete procurement", async () => {
    const data = await getProcurements();
    expect(await deleteProcurement(data[0].id)).toBe(true);
  });

  test("search", async () => {
    expect(Array.isArray(await searchProcurements(""))).toBe(true);
  });

  test("filter", async () => {
    expect(Array.isArray(await filterProcurements("All"))).toBe(true);
  });

});