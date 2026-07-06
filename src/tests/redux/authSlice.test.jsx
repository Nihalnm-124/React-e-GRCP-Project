import authReducer, {
  loginSuccess,
  logout,
} from "../../store/slices/authSlice";

describe("authSlice", () => {

  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  test("should return initial state", () => {

    expect(
      authReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);

  });

  test("should login successfully", () => {

    const user = {
      id: 1,
      name: "Administrator",
      email: "admin@egrcp.com",
      role: "Admin",
    };

    const state = authReducer(
      initialState,
      loginSuccess(user)
    );

    expect(state.user).toEqual(user);

    expect(
      state.isAuthenticated
    ).toBe(true);

  });

  test("should logout", () => {

    const loggedInState = {
      user: {
        id: 1,
        role: "Admin",
      },
      isAuthenticated: true,
    };

    const state = authReducer(
      loggedInState,
      logout()
    );

    expect(state.user).toBeNull();

    expect(
      state.isAuthenticated
    ).toBe(false);

  });

});