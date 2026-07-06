import notificationReducer, {
  setNotifications,
  addNotification,
  markAsRead,
  removeNotification,
} from "../../store/slices/notificationSlice";

describe("notificationSlice", () => {

  const initialState = {
    notifications: [],
    unreadCount: 0,
  };

  test("should return initial state", () => {

    expect(
      notificationReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);

  });

  test("should set notifications and unread count", () => {

    const notifications = [

      {
        id: 1,
        title: "Risk Alert",
        status: "Unread",
      },

      {
        id: 2,
        title: "Vendor Updated",
        status: "Read",
      },

      {
        id: 3,
        title: "Compliance",
        status: "Unread",
      },

    ];

    const state = notificationReducer(
      initialState,
      setNotifications(notifications)
    );

    expect(state.notifications).toEqual(
      notifications
    );

    expect(state.unreadCount).toBe(2);

  });

  test("should add notification", () => {

    const notification = {

      id: 4,

      title: "New Approval",

      status: "Unread",

    };

    const state = notificationReducer(
      initialState,
      addNotification(notification)
    );

    expect(state.notifications).toHaveLength(1);

    expect(state.notifications[0]).toEqual(
      notification
    );

    expect(state.unreadCount).toBe(1);

  });

  test("should mark notification as read", () => {

    const stateBefore = {

      notifications: [

        {
          id: 1,
          status: "Unread",
        },

      ],

      unreadCount: 1,

    };

    const state = notificationReducer(
      stateBefore,
      markAsRead(1)
    );

    expect(
      state.notifications[0].status
    ).toBe("Read");

    expect(state.unreadCount).toBe(0);

  });

  test("should remove notification", () => {

    const stateBefore = {

      notifications: [

        {
          id: 1,
          status: "Unread",
        },

        {
          id: 2,
          status: "Read",
        },

      ],

      unreadCount: 1,

    };

    const state = notificationReducer(
      stateBefore,
      removeNotification(1)
    );

    expect(state.notifications).toHaveLength(1);

    expect(state.notifications[0].id).toBe(2);

    expect(state.unreadCount).toBe(0);

  });

});