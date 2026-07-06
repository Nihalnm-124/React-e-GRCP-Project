import {
  getNotifications,
  searchNotifications,
  filterPriority,
  filterStatus,
  markAsRead,
  markAsUnread,
  addNotification,
  deleteNotification,
  generateNotification,
} from "../../services/notificationService";

describe("notificationService", () => {

  test("get notifications", async () => {

    const data = await getNotifications();

    expect(Array.isArray(data)).toBe(true);

  });

  test("search", async () => {

    const result =
      await searchNotifications("");

    expect(Array.isArray(result)).toBe(true);

  });

  test("priority filter", async () => {

    const result =
      await filterPriority("All");

    expect(Array.isArray(result)).toBe(true);

  });

  test("status filter", async () => {

    const result =
      await filterStatus("All");

    expect(Array.isArray(result)).toBe(true);

  });

  test("mark read", async () => {

    expect(
      await markAsRead(1)
    ).toBe(true);

  });

  test("mark unread", async () => {

    expect(
      await markAsUnread(1)
    ).toBe(true);

  });

  test("add notification", async () => {

    const item =
      await addNotification({

        title: "Test",

        message: "Hello",

        priority: "Low",

      });

    expect(item.title).toBe("Test");

  });

  test("delete notification", async () => {

    expect(
      await deleteNotification(1)
    ).toBe(true);

  });

  test("generate notification", () => {

    const item =
      generateNotification();

    expect(item).toHaveProperty("id");

  });

});