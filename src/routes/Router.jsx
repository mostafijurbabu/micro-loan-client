import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AllLoans from "../pages/allLoans/AllLoans";
import LoanDetails from "../Components/loanCard/LoanDetails";
import AvailableLoans from "../pages/Home/Home/Banner/AvailableLoans";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/loans"),
      },
      {
        path: "available-loans",
        element: <AvailableLoans></AvailableLoans>,
        loader: () => fetch("http://localhost:3000/loans"),
      },
      {
        path: "loans",
        element: <AllLoans></AllLoans>,
        loader: () => fetch("http://localhost:3000/loans"),
      },
      {
        path: "/loan-details/:id",
        element: <LoanDetails></LoanDetails>,
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
]);
