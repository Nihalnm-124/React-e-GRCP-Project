import {
  login,
  logoutUser,
} from "../../services/authService";

describe("authService", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test("should login successfully", async () => {

    const user = await login({
      email: "admin@egrcp.com",
      password: "admin123",
    });

    expect(user.email).toBe(
      "admin@egrcp.com"
    );

    expect(
      localStorage.getItem("token")
    ).toBe("demo-token-12345");

  });

  test("should reject invalid login", async () => {

    await expect(
      login({
        email: "wrong@test.com",
        password: "123",
      })
    ).rejects.toBe(
      "Invalid Email or Password"
    );

  });

  test("should logout successfully", () => {

    localStorage.setItem(
      "token",
      "demo-token-12345"
    );

    logoutUser();

    expect(
      localStorage.getItem("token")
    ).toBeNull();

  });

});