let security = {
  twoFactor: false,
  lastLogin: "2026-07-05 09:15 AM",
  activeSessions: 3,
};

export const getSecuritySettings =
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...security,
        });
      }, 400);
    });
  };

export const updateSecuritySettings =
  (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        security = {
          ...security,
          ...data,
        };

        resolve(true);
      }, 500);
    });
  };

export const changePassword =
  (
    currentPassword,
    newPassword
  ) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message:
            "Password changed successfully.",
        });
      }, 800);
    });
  };

export const logoutAllDevices =
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        security.activeSessions = 1;

        resolve(true);
      }, 600);
    });
  };