import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  stats: {},
  loading: false,
  error: null,
};

const dashboardSlice =
  createSlice({
    name: "dashboard",

    initialState,

    reducers: {

      setLoading: (
        state,
        action
      ) => {
        state.loading =
          action.payload;
      },

      setStats: (
        state,
        action
      ) => {
        state.stats =
          action.payload;
      },

      setError: (
        state,
        action
      ) => {
        state.error =
          action.payload;
      },

      clearError: (
        state
      ) => {
        state.error = null;
      },

    },

  });

export const {
  setLoading,
  setStats,
  setError,
  clearError,
} =
  dashboardSlice.actions;

export default
  dashboardSlice.reducer;