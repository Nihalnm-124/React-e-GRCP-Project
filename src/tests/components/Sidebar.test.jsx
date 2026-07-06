import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import authReducer from "../../store/slices/authSlice";
import Sidebar from "../../components/layout/Sidebar";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

function renderSidebar() {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar
          mobileOpen={false}
          handleDrawerToggle={() => {}}
        />
      </MemoryRouter>
    </Provider>
  );
}

describe("Sidebar Component", () => {

  test("renders app title", () => {

    renderSidebar();

    expect(
      screen.getAllByText("e-GRCP").length
    ).toBeGreaterThan(0);

  });

  test("renders Dashboard menu", () => {

    renderSidebar();

    expect(
      screen.getAllByText("Dashboard").length
    ).toBeGreaterThan(0);

  });

  test("renders Procurement menu", () => {

    renderSidebar();

    expect(
      screen.getAllByText("Procurement").length
    ).toBeGreaterThan(0);

  });

  test("renders Logout button", () => {

    renderSidebar();

    expect(
      screen.getAllByText("Logout").length
    ).toBeGreaterThan(0);

  });

});