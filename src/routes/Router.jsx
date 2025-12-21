import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AllLoans from "../pages/allLoans/AllLoans";
import LoanDetails from "../Components/loanCard/LoanDetails";
import AvailableLoans from "../pages/Home/Home/Banner/AvailableLoans";
import ApplyLoanForm from "../Components/loanCard/ApplyLoanForm";
import { applyLoanLoader, loanDetailsLoader } from "../loaders/loanLoaders";
import DashboardLayout from "../layouts/DashboardLayout";
import MyLoans from "../pages/Dashboard/MyLoans";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import MyProfile from "../pages/Dashboard/MyProfile";
import AdminAllLoans from "../pages/Dashboard/AdminAllLoans";
import AdminLoanApplication from "../pages/Dashboard/AdminLoanApplication";
import AddLoan from "../pages/Dashboard/AddLoan";
import ManagerRoute from "./ManagerRoute";
import ManageLoans from "../pages/Dashboard/ManageLoans";
import PendingLoans from "../pages/Dashboard/PendingLoans";
import ApprovedLoans from "../pages/Dashboard/ApprovedLoans";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/loans"),
      },
      {
        path: "available-loans",
        element: <AvailableLoans></AvailableLoans>,
        loader: () => fetch("http://localhost:5000/loans"),
      },
      {
        path: "loans",
        element: <AllLoans></AllLoans>,
        loader: () => fetch("http://localhost:5000/loans"),
      },
      {
        path: "/loans/:id",
        element: <LoanDetails></LoanDetails>,
        loader: loanDetailsLoader,
      },
      {
        path: "/apply-loan/:id",
        element: <ApplyLoanForm />,
        loader: applyLoanLoader,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "my-loans",
        Component: MyLoans,
      },
      {
        path: "payment/:applicationId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },

      // Admin
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "admin-all-loans",
        element: (
          <AdminRoute>
            <AdminAllLoans />
          </AdminRoute>
        ),
      },
      {
        path: "admin-loan-application",
        element: (
          <AdminRoute>
            <AdminLoanApplication />
          </AdminRoute>
        ),
      },

      // Manager
      {
        path: "add-loan",
        element: (
          <ManagerRoute>
            <AddLoan />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <ManagerRoute>
            <ManageLoans />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <ManagerRoute>
            <PendingLoans />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <ManagerRoute>
            <ApprovedLoans />
          </ManagerRoute>
        ),
      },
    ],
  },
]);
