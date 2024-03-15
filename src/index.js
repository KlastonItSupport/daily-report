import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/home";
import { CreateDailyReportPage } from "./pages/daily-report";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignDocumentPage } from "./pages/sign-document";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { RecoverPasswordPage } from "./pages/recover-password";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "create/report",
    element: <CreateDailyReportPage />,
  },
  {
    path: "sign/document/:dailyReportId",
    element: <SignDocumentPage />,
  },
  {
    path: "forgot/password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "recover/password/:userId/:token",
    element: <RecoverPasswordPage />,
  },
]);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
