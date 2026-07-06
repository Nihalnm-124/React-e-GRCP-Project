import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  compliances: [],
};

const complianceSlice =
  createSlice({

    name: "compliance",

    initialState,

    reducers: {

      setCompliances: (
        state,
        action
      ) => {

        state.compliances =
          action.payload;

      },

      addCompliance: (
        state,
        action
      ) => {

        state.compliances.unshift(
          action.payload
        );

      },

      updateCompliance: (
        state,
        action
      ) => {

        state.compliances =
          state.compliances.map(
            (item) =>
              item.id ===
              action.payload.id
                ? action.payload
                : item
          );

      },

      deleteCompliance: (
        state,
        action
      ) => {

        state.compliances =
          state.compliances.filter(
            (item) =>
              item.id !==
              action.payload
          );

      },

    },

  });

export const {

  setCompliances,

  addCompliance,

  updateCompliance,

  deleteCompliance,

} =
  complianceSlice.actions;

export default
  complianceSlice.reducer;