import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  reports: [],
};

const reportSlice =
  createSlice({

    name: "reports",

    initialState,

    reducers: {

      setReports: (
        state,
        action
      ) => {

        state.reports =
          action.payload;

      },

      addReport: (
        state,
        action
      ) => {

        state.reports.unshift(
          action.payload
        );

      },

      updateReport: (
        state,
        action
      ) => {

        state.reports =
          state.reports.map(
            (item) =>
              item.id ===
              action.payload.id
                ? action.payload
                : item
          );

      },

      deleteReport: (
        state,
        action
      ) => {

        state.reports =
          state.reports.filter(
            (item) =>
              item.id !==
              action.payload
          );

      },

    },

  });

export const {

  setReports,

  addReport,

  updateReport,

  deleteReport,

} =
  reportSlice.actions;

export default
  reportSlice.reducer;