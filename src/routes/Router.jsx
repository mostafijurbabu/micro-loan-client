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
    ],
  },
]);
