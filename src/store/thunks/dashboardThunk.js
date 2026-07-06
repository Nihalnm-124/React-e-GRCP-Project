import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getDashboardStats,
} from "../../services/dashboardService";

export const fetchDashboardData =
  createAsyncThunk(

    "dashboard/fetchDashboardData",

    async (_, thunkAPI) => {

      try {

        const data =
          await getDashboardStats();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );

      }

    }

  );