import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AvailableLoans from "../pages/Home/Home/Banner/AvailableLoans";
import AllLoans from "../pages/allLoans/AllLoans";
import LoanDetails from "../Components/loanCard/LoanDetails";
import ApplyLoanForm from "../Components/loanCard/ApplyLoanForm";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
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
import ManageLoans from "../pages/Dashboard/ManageLoans";
import PendingLoans from "../pages/Dashboard/PendingLoans";
import ApprovedLoans from "../pages/Dashboard/ApprovedLoans";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { homeLoader } from "../pages/Home/Home/homeLoader";
import { availableLoansLoader } from "../pages/Home/Home/AvailableLoanLoaders";
import { loanDetailsLoader, applyLoanLoader } from "../loaders/loanLoaders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: "available-loans",
        element: <AvailableLoans />,
        loader: availableLoansLoader,
      },
      {
        path: "loans",
        element: <AllLoans />,
        loader: async () => {
          const res = await fetch(`${BASE_URL}/loans`);
          if (!res.ok)
            throw new Response("Failed to load loans", { status: res.status });
          return res.json();
        },
      },
      {
        path: "/loans/:id",
        element: <LoanDetails />,
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
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "my-loans", Component: MyLoans },
      { path: "payment/:applicationId", Component: Payment },
      { path: "payment-history", Component: PaymentHistory },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancelled", Component: PaymentCancelled },
      { path: "my-profile", Component: MyProfile },

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
