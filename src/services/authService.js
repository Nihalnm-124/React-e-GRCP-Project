import users from "../mocks/users.json";

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) =>
          u.email === credentials.email &&
          u.password === credentials.password
      );

      if (user) {
        localStorage.setItem("token", "demo-token-12345");

        resolve(user);
      } else {
        reject("Invalid Email or Password");
      }
    }, 1000);
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};