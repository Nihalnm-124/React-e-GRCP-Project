import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  risks: [],
};

const riskSlice =
  createSlice({

    name: "risk",

    initialState,

    reducers: {

      setRisks: (
        state,
        action
      ) => {

        state.risks =
          action.payload;

      },

      addRisk: (
        state,
        action
      ) => {

        state.risks.unshift(
          action.payload
        );

      },

      updateRisk: (
        state,
        action
      ) => {

        state.risks =
          state.risks.map(
            (item) =>
              item.id ===
              action.payload.id
                ? action.payload
                : item
          );

      },

      deleteRisk: (
        state,
        action
      ) => {

        state.risks =
          state.risks.filter(
            (item) =>
              item.id !==
              action.payload
          );

      },

    },

  });

export const {

  setRisks,

  addRisk,

  updateRisk,

  deleteRisk,

} =
  riskSlice.actions;

export default
  riskSlice.reducer;