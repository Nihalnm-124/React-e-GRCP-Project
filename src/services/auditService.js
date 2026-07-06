import audits from "../mocks/audits.json";

let auditData = [...audits];

// Get All Audits
export const getAudits = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...auditData]);
    }, 500);
  });
};

// Get Audit By ID
export const getAuditById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        auditData.find(
          (audit) => audit.id === id
        )
      );
    }, 300);
  });
};

// Add Audit
export const addAudit = (audit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAudit = {
        ...audit,
        id: Date.now(),
      };

      auditData.unshift(newAudit);

      resolve(newAudit);
    }, 500);
  });
};

// Update Audit
export const updateAudit = (
  id,
  updatedAudit
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      auditData = auditData.map((audit) =>
        audit.id === id
          ? {
              ...audit,
              ...updatedAudit,
            }
          : audit
      );

      resolve(true);
    }, 500);
  });
};

// Delete Audit
export const deleteAudit = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      auditData = auditData.filter(
        (audit) => audit.id !== id
      );

      resolve(true);
    }, 500);
  });
};

// Search Audits
export const searchAudits = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value =
        keyword.toLowerCase();

      resolve(
        auditData.filter(
          (audit) =>
            audit.auditName
              .toLowerCase()
              .includes(value) ||
            audit.auditor
              .toLowerCase()
              .includes(value) ||
            audit.department
              .toLowerCase()
              .includes(value)
        )
      );
    }, 300);
  });
};

// Filter By Status
export const filterAuditStatus = (
  status
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status === "All") {
        resolve([...auditData]);
      } else {
        resolve(
          auditData.filter(
            (audit) =>
              audit.status === status
          )
        );
      }
    }, 300);
  });
};

// Filter By Auditor
export const filterAuditor = (
  auditor
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (auditor === "All") {
        resolve([...auditData]);
      } else {
        resolve(
          auditData.filter(
            (audit) =>
              audit.auditor === auditor
          )
        );
      }
    }, 300);
  });
};

// Export
export const exportAuditData = () => {
  return [...auditData];
};