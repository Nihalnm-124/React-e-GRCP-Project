import dashboard from "../mocks/dashboard.json";

export const getDashboard = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboard);
    }, 800);
  });
};