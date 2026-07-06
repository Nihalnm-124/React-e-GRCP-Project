import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  procurements: [],
};

const procurementSlice =
  createSlice({

    name: "procurement",

    initialState,

    reducers: {

      setProcurements: (
        state,
        action
      ) => {

        state.procurements =
          action.payload;

      },

      addProcurement: (
        state,
        action
      ) => {

        state.procurements.unshift(
          action.payload
        );

      },

      updateProcurement: (
        state,
        action
      ) => {

        state.procurements =
          state.procurements.map(
            (item) =>
              item.id ===
              action.payload.id
                ? action.payload
                : item
          );

      },

      deleteProcurement: (
        state,
        action
      ) => {

        state.procurements =
          state.procurements.filter(
            (item) =>
              item.id !==
              action.payload
          );

      },

    },

  });

export const {

  setProcurements,

  addProcurement,

  updateProcurement,

  deleteProcurement,

} =
  procurementSlice.actions;

export default
  procurementSlice.reducer;