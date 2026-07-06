import { getDashboard } from "../../services/dashboardService";

describe("dashboardService", () => {

  test("should return dashboard data", async () => {

    const data = await getDashboard();

    expect(data).toBeDefined();

    expect(typeof data).toBe("object");

  });

});