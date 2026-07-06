import procurements from "../mocks/procurements.json";

let procurementData = [...procurements];

// Get All
export const getProcurements = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...procurementData]);
    }, 500);
  });
};

// Get By Id
export const getProcurementById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        procurementData.find(
          (item) => item.id === id
        )
      );
    }, 300);
  });
};

// Add
export const addProcurement = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = {
        ...data,
        id: Date.now(),
      };

      procurementData.unshift(newItem);

      resolve(newItem);
    }, 500);
  });
};

// Update
export const updateProcurement = (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      procurementData = procurementData.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedData,
            }
          : item
      );

      resolve(true);
    }, 500);
  });
};

// Delete
export const deleteProcurement = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      procurementData =
        procurementData.filter(
          (item) => item.id !== id
        );

      resolve(true);
    }, 500);
  });
};

// Search
export const searchProcurements = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result =
        procurementData.filter((item) =>
          item.title
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            ) ||
          item.vendor
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            ) ||
          item.department
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            )
        );

      resolve(result);
    }, 300);
  });
};

// Filter
export const filterProcurements = (status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status === "All") {
        resolve([...procurementData]);
      } else {
        resolve(
          procurementData.filter(
            (item) =>
              item.status === status
          )
        );
      }
    }, 300);
  });
};