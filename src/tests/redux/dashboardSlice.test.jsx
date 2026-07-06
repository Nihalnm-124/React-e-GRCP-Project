import dashboardReducer, {
  setLoading,
  setStats,
  setError,
  clearError,
} from "../../store/slices/dashboardSlice";

describe("dashboardSlice", () => {

  const initialState = {
    stats: {},
    loading: false,
    error: null,
  };

  test("should return initial state", () => {

    expect(
      dashboardReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);

  });

  test("should set loading", () => {

    const state = dashboardReducer(
      initialState,
      setLoading(true)
    );

    expect(state.loading).toBe(true);

  });

  test("should set stats", () => {

    const stats = {

      procurements: 120,

      vendors: 45,

      risks: 12,

      compliance: 98,

    };

    const state = dashboardReducer(
      initialState,
      setStats(stats)
    );

    expect(state.stats).toEqual(stats);

  });

  test("should set error", () => {

    const state = dashboardReducer(
      initialState,
      setError("Network Error")
    );

    expect(state.error).toBe(
      "Network Error"
    );

  });

  test("should clear error", () => {

    const state = dashboardReducer(
      {
        ...initialState,
        error: "Network Error",
      },
      clearError()
    );

    expect(state.error).toBeNull();

  });

});