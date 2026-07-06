import risks from "../mocks/risks.json";

let riskData = [...risks];

// Get All Risks
export const getRisks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...riskData]);
    }, 500);
  });
};

// Get Risk By ID
export const getRiskById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        riskData.find((risk) => risk.id === id)
      );
    }, 300);
  });
};

// Add Risk
export const addRisk = (risk) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRisk = {
        ...risk,
        id: Date.now(),
        score:
          Number(risk.probability) *
          Number(risk.impact),
      };

      riskData.unshift(newRisk);

      resolve(newRisk);
    }, 500);
  });
};

// Update Risk
export const updateRisk = (
  id,
  updatedRisk
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      riskData = riskData.map((risk) =>
        risk.id === id
          ? {
              ...risk,
              ...updatedRisk,
              score:
                Number(
                  updatedRisk.probability
                ) *
                Number(updatedRisk.impact),
            }
          : risk
      );

      resolve(true);
    }, 500);
  });
};

// Delete Risk
export const deleteRisk = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      riskData = riskData.filter(
        (risk) => risk.id !== id
      );

      resolve(true);
    }, 500);
  });
};

// Search
export const searchRisks = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value =
        keyword.toLowerCase();

      resolve(
        riskData.filter(
          (risk) =>
            risk.title
              .toLowerCase()
              .includes(value) ||
            risk.owner
              .toLowerCase()
              .includes(value) ||
            risk.category
              .toLowerCase()
              .includes(value)
        )
      );
    }, 300);
  });
};

// Filter Severity
export const filterSeverity = (
  severity
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (severity === "All") {
        resolve([...riskData]);
      } else {
        resolve(
          riskData.filter(
            (risk) =>
              risk.severity === severity
          )
        );
      }
    }, 300);
  });
};

// Filter Status
export const filterRiskStatus = (
  status
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status === "All") {
        resolve([...riskData]);
      } else {
        resolve(
          riskData.filter(
            (risk) =>
              risk.status === status
          )
        );
      }
    }, 300);
  });
};

// Export
export const exportRiskData = () => {
  return [...riskData];
};