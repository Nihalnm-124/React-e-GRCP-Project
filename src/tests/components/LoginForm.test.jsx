import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../store/slices/authSlice";
import LoginForm from "../../components/forms/LoginForm";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("LoginForm Component", () => {

  test("renders email field", () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

  });

  test("renders password field", () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

  });

  test("renders login button", () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();

  });

});