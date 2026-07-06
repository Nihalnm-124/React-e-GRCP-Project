import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice =
  createSlice({
    name: "notifications",

    initialState,

    reducers: {

      setNotifications: (
        state,
        action
      ) => {

        state.notifications =
          action.payload;

        state.unreadCount =
          action.payload.filter(
            (n) =>
              n.status ===
              "Unread"
          ).length;

      },

      addNotification: (
        state,
        action
      ) => {

        state.notifications.unshift(
          action.payload
        );

        state.unreadCount++;

      },

      markAsRead: (
        state,
        action
      ) => {

        const notification =
          state.notifications.find(
            (n) =>
              n.id ===
              action.payload
          );

        if (
          notification &&
          notification.status ===
            "Unread"
        ) {

          notification.status =
            "Read";

          state.unreadCount--;

        }

      },

      removeNotification: (
        state,
        action
      ) => {

        state.notifications =
          state.notifications.filter(
            (n) =>
              n.id !==
              action.payload
          );

        state.unreadCount =
          state.notifications.filter(
            (n) =>
              n.status ===
              "Unread"
          ).length;

      },

    },

  });

export const {

  setNotifications,

  addNotification,

  markAsRead,

  removeNotification,

} =
  notificationSlice.actions;

export default
  notificationSlice.reducer;