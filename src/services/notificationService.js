import notifications from "../mocks/notification.json";

let data = [...notifications];

const delay = (value) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), 500)
  );

export function getNotifications() {
  return delay([...data]);
}

export function searchNotifications(
  keyword
) {
  const text =
    keyword.toLowerCase();

  return delay(
    data.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(text) ||
        item.message
          .toLowerCase()
          .includes(text)
    )
  );
}

export function filterPriority(
  priority
) {
  if (priority === "All") {
    return delay([...data]);
  }

  return delay(
    data.filter(
      (item) =>
        item.priority ===
        priority
    )
  );
}

export function filterStatus(
  status
) {
  if (status === "All") {
    return delay([...data]);
  }

  return delay(
    data.filter(
      (item) =>
        item.status ===
        status
    )
  );
}

export function markAsRead(id) {

  data = data.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Read",
        }
      : item
  );

  return delay(true);

}

export function markAsUnread(
  id
) {

  data = data.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Unread",
        }
      : item
  );

  return delay(true);

}

export function addNotification(
  notification
) {

  const newItem = {
    id: Date.now(),
    ...notification,
  };

  data.unshift(newItem);

  return delay(newItem);

}

export function deleteNotification(
  id
) {

  data = data.filter(
    (item) =>
      item.id !== id
  );

  return delay(true);

}

/* Simulated Real-Time Notification */

export function generateNotification() {

  const samples = [
    {
      title:
        "New Procurement Request",
      message:
        "A new procurement request has been submitted.",
      priority: "Medium",
    },
    {
      title:
        "Critical Risk Detected",
      message:
        "Immediate investigation required.",
      priority: "High",
    },
    {
      title:
        "Vendor Updated",
      message:
        "Vendor profile has been modified.",
      priority: "Low",
    },
  ];

  const random =
    samples[
      Math.floor(
        Math.random() *
          samples.length
      )
    ];

  const notification = {
    id: Date.now(),
    ...random,
    status: "Unread",
    time: "Just now",
  };

  data.unshift(notification);

  return notification;

}