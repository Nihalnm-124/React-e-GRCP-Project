import vendors from "../mocks/vendors.json";

let vendorData = [...vendors];

// Get All Vendors
export const getVendors = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...vendorData]);
    }, 500);
  });
};

// Get Vendor By ID
export const getVendorById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        vendorData.find(
          (vendor) => vendor.id === id
        )
      );
    }, 300);
  });
};

// Add Vendor
export const addVendor = (vendor) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newVendor = {
        ...vendor,
        id: Date.now(),
      };

      vendorData.unshift(newVendor);

      resolve(newVendor);
    }, 500);
  });
};

// Update Vendor
export const updateVendor = (
  id,
  updatedVendor
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      vendorData = vendorData.map((vendor) =>
        vendor.id === id
          ? {
              ...vendor,
              ...updatedVendor,
            }
          : vendor
      );

      resolve(true);
    }, 500);
  });
};

// Delete Vendor
export const deleteVendor = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      vendorData = vendorData.filter(
        (vendor) => vendor.id !== id
      );

      resolve(true);
    }, 500);
  });
};

// Search Vendors
export const searchVendors = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value =
        keyword.toLowerCase();

      resolve(
        vendorData.filter(
          (vendor) =>
            vendor.company
              .toLowerCase()
              .includes(value) ||
            vendor.contact
              .toLowerCase()
              .includes(value) ||
            vendor.email
              .toLowerCase()
              .includes(value) ||
            vendor.country
              .toLowerCase()
              .includes(value)
        )
      );
    }, 300);
  });
};

// Filter By Status
export const filterVendors = (
  status
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status === "All") {
        resolve([...vendorData]);
      } else {
        resolve(
          vendorData.filter(
            (vendor) =>
              vendor.status === status
          )
        );
      }
    }, 300);
  });
};

// Filter By Risk
export const filterRisk = (risk) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (risk === "All") {
        resolve([...vendorData]);
      } else {
        resolve(
          vendorData.filter(
            (vendor) =>
              vendor.risk === risk
          )
        );
      }
    }, 300);
  });
};

// Export Data
export const exportVendorData = () => {
  return [...vendorData];
};