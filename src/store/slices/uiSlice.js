import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
  sidebarOpen: true,
  loading: false,
};

const uiSlice =
  createSlice({

    name: "ui",

    initialState,

    reducers: {

      toggleTheme: (
        state
      ) => {

        state.themeMode =
          state.themeMode ===
          "light"
            ? "dark"
            : "light";

      },

      toggleSidebar: (
        state
      ) => {

        state.sidebarOpen =
          !state.sidebarOpen;

      },

      setLoading: (
        state,
        action
      ) => {

        state.loading =
          action.payload;

      },

    },

  });

export const {

  toggleTheme,

  toggleSidebar,

  setLoading,

} =
  uiSlice.actions;

export default
  uiSlice.reducer;