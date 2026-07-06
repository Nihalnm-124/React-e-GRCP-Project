import {
  getSecuritySettings,
  updateSecuritySettings,
  changePassword,
  logoutAllDevices,
} from "../../services/settingService";

describe("settingService", () => {

  test("get settings", async () => {

    const data = await getSecuritySettings();

    expect(data).toHaveProperty("twoFactor");
    expect(data).toHaveProperty("activeSessions");

  });

  test("update settings", async () => {

    const result = await updateSecuritySettings({
      twoFactor: true,
    });

    expect(result).toBe(true);

  });

  test("change password", async () => {

    const result = await changePassword(
      "old",
      "new"
    );

    expect(result.success).toBe(true);

  });

  test("logout all devices", async () => {

    const result =
      await logoutAllDevices();

    expect(result).toBe(true);

  });

});