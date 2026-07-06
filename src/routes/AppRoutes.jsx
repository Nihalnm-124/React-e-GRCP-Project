import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import SessionExpired from "../pages/auth/SessionExpired";

import Dashboard from "../pages/dashboard/Dashboard";
import Procurement from "../pages/procurement/Procurement";
import Vendors from "../pages/vendors/Vendors";
import Risk from "../pages/risk/Risk";
import Compliance from "../pages/compliance/Compliance";
import Audit from "../pages/audit/Audit";
import Reports from "../pages/reports/Reports";
import ReportDetails from "../pages/reports/ReportDetails";
import Settings from "../pages/settings/Settings";
import Approval from "../pages/approval/Approval";
import Notifications from "../pages/notifications/Notifications";

function AppRoutes() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/forgot-password"
        element={
          <ForgotPassword />
        }
      />

      <Route
        path="/reset-password"
        element={
          <ResetPassword />
        }
      />

      <Route
        path="/session-expired"
        element={
          <SessionExpired />
        }
      />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />

        <Route
          path="/procurement"
          element={
            <UserRoute>
              <Procurement />
            </UserRoute>
          }
        />

        <Route
          path="/vendors"
          element={
            <UserRoute>
              <Vendors />
            </UserRoute>
          }
        />

        <Route
          path="/risk"
          element={
            <UserRoute>
              <Risk />
            </UserRoute>
          }
        />

        <Route
          path="/compliance"
          element={
            <UserRoute>
              <Compliance />
            </UserRoute>
          }
        />

        <Route
          path="/audit"
          element={
            <UserRoute>
              <Audit />
            </UserRoute>
          }
        />

        <Route
  path="/approval"
  element={
    <UserRoute>
      <Approval />
    </UserRoute>
  }
/>

<Route
  path="/notifications"
  element={
    <UserRoute>
      <Notifications />
    </UserRoute>
  }
/>

        <Route
          path="/reports"
          element={
            <UserRoute>
              <Reports />
            </UserRoute>
          }
        />

        <Route
          path="/reports/:id"
          element={
            <UserRoute>
              <ReportDetails />
            </UserRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />

      </Route>

      {/* Invalid Route */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>

  );

}

export default AppRoutes;