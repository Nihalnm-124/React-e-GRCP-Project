import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  audits: [],
};

const auditSlice =
  createSlice({

    name: "audit",

    initialState,

    reducers: {

      setAudits: (
        state,
        action
      ) => {

        state.audits =
          action.payload;

      },

      addAudit: (
        state,
        action
      ) => {

        state.audits.unshift(
          action.payload);
        

      },

      updateAudit: (
        state,
        action
      ) => {

        state.audits =
          state.audits.map(
            (item) =>
              item.id ===
              action.payload.id
                ? action.payload
                : item
          );

      },

      deleteAudit: (
        state,
        action
      ) => {

        state.audits =
          state.audits.filter(
            (item) =>
              item.id !==
              action.payload
          );

      },

    },

  });

export const {

  setAudits,

  addAudit,

  updateAudit,

  deleteAudit,

} =
  auditSlice.actions;

export default
  auditSlice.reducer;