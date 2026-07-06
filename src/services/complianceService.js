import compliances from "../mocks/compliance.json";

let complianceData = [...compliances];

// Get All
export const getCompliances = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...complianceData]);
    }, 500);
  });
};

// Get By ID
export const getComplianceById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        complianceData.find(
          (item) => item.id === id
        )
      );
    }, 300);
  });
};

// Add
export const addCompliance = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCompliance = {
        ...data,
        id: Date.now(),
      };

      complianceData.unshift(newCompliance);

      resolve(newCompliance);
    }, 500);
  });
};

// Update
export const updateCompliance = (
  id,
  updated
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      complianceData = complianceData.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                ...updated,
              }
            : item
      );

      resolve(true);
    }, 500);
  });
};

// Delete
export const deleteCompliance = (
  id
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      complianceData =
        complianceData.filter(
          (item) => item.id !== id
        );

      resolve(true);
    }, 500);
  });
};

// Search
export const searchCompliance = (
  keyword
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value =
        keyword.toLowerCase();

      resolve(
        complianceData.filter(
          (item) =>
            item.policy
              .toLowerCase()
              .includes(value) ||
            item.control
              .toLowerCase()
              .includes(value) ||
            item.owner
              .toLowerCase()
              .includes(value) ||
            item.framework
              .toLowerCase()
              .includes(value)
        )
      );
    }, 300);
  });
};

// Filter Status
export const filterComplianceStatus =
  (status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (status === "All") {
          resolve([
            ...complianceData,
          ]);
        } else {
          resolve(
            complianceData.filter(
              (item) =>
                item.status === status
            )
          );
        }
      }, 300);
    });
  };

// Filter Framework
export const filterFramework = (
  framework
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (framework === "All") {
        resolve([
          ...complianceData,
        ]);
      } else {
        resolve(
          complianceData.filter(
            (item) =>
              item.framework ===
              framework
          )
        );
      }
    }, 300);
  });
};

// Export
export const exportComplianceData =
  () => {
    return [...complianceData];
  };