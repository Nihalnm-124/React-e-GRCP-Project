import {
  getVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
  searchVendors,
  filterVendors,
  filterRisk,
  exportVendorData,
} from "../../services/vendorService";

describe("vendorService", () => {

  test("should fetch all vendors", async () => {

    const vendors = await getVendors();

    expect(Array.isArray(vendors)).toBe(true);

    expect(vendors.length).toBeGreaterThan(0);

  });

  test("should fetch vendor by id", async () => {

    const vendors = await getVendors();

    const vendor = await getVendorById(
      vendors[0].id
    );

    expect(vendor.id).toBe(
      vendors[0].id
    );

  });

  test("should add vendor", async () => {

    const vendor = {

      company: "OpenAI Pvt Ltd",

      contact: "John",

      email: "john@test.com",

      country: "India",

      status: "Active",

      risk: "Low",

    };

    const result =
      await addVendor(vendor);

    expect(result.company).toBe(
      "OpenAI Pvt Ltd"
    );

  });

  test("should update vendor", async () => {

    const vendors =
      await getVendors();

    const result =
      await updateVendor(
        vendors[0].id,
        {
          company:
            "Updated Company",
        }
      );

    expect(result).toBe(true);

  });

  test("should delete vendor", async () => {

    const vendors =
      await getVendors();

    const result =
      await deleteVendor(
        vendors[0].id
      );

    expect(result).toBe(true);

  });

  test("should search vendors", async () => {

    const result =
      await searchVendors("");

    expect(
      Array.isArray(result)
    ).toBe(true);

  });

  test("should filter vendors by status", async () => {

    const result =
      await filterVendors("All");

    expect(
      Array.isArray(result)
    ).toBe(true);

  });

  test("should filter vendors by risk", async () => {

    const result =
      await filterRisk("All");

    expect(
      Array.isArray(result)
    ).toBe(true);

  });

  test("should export vendor data", () => {

    const data =
      exportVendorData();

    expect(
      Array.isArray(data)
    ).toBe(true);

  });

});