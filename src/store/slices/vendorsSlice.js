import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  vendors: [],
};

const vendorsSlice =
  createSlice({

    name: "vendors",

    initialState,

    reducers: {

      setVendors: (
        state,
        action
      ) => {

        state.vendors =
          action.payload;

      },

      addVendor: (
        state,
        action
      ) => {

        state.vendors.unshift(
          action.payload
        );

      },

      updateVendor: (
        state,
        action
      ) => {

        state.vendors =
          state.vendors.map(
            (item) =>
              item.id ===
              action.payload.id
                ? action.payload
                : item
          );

      },

      deleteVendor: (
        state,
        action
      ) => {

        state.vendors =
          state.vendors.filter(
            (item) =>
              item.id !==
              action.payload
          );

      },

    },

  });

export const {

  setVendors,

  addVendor,

  updateVendor,

  deleteVendor,

} =
  vendorsSlice.actions;

export default
  vendorsSlice.reducer;