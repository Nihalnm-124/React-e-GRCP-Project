import approvals from "../mocks/approval.json";

let data = [...approvals];

const delay = (value) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), 500)
  );

export function getApprovals() {
  return delay([...data]);
}

export function searchApprovals(keyword) {
  const text = keyword.toLowerCase();

  return delay(
    data.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(text) ||
        item.requester
          .toLowerCase()
          .includes(text) ||
        item.department
          .toLowerCase()
          .includes(text)
    )
  );
}

export function filterApprovalStatus(
  status
) {
  if (status === "All") {
    return delay([...data]);
  }

  return delay(
    data.filter(
      (item) =>
        item.status === status
    )
  );
}

export function addApproval(item) {
  const newItem = {
    id: Date.now(),
    ...item,
  };

  data.unshift(newItem);

  return delay(newItem);
}

export function updateApproval(
  id,
  updated
) {
  data = data.map((item) =>
    item.id === id
      ? { ...item, ...updated }
      : item
  );

  return delay(true);
}

export function deleteApproval(id) {
  data = data.filter(
    (item) => item.id !== id
  );

  return delay(true);
}

export function approveRequest(id) {
  data = data.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Approved",
        }
      : item
  );

  return delay(true);
}

export function rejectRequest(id) {
  data = data.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Rejected",
        }
      : item
  );

  return delay(true);
}

export function sendBackRequest(
  id
) {
  data = data.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Pending",
        }
      : item
  );

  return delay(true);
}

export function delegateRequest(
  id,
  user
) {
  data = data.map((item) =>
    item.id === id
      ? {
          ...item,
          delegatedTo: user,
        }
      : item
  );

  return delay(true);
}