import { createBrowserRouter } from "react-router-dom";

//pages
import LandingPage from "../pages/landing/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import { MainLayout } from "../components/common";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OTPPage from "../pages/auth/OTPPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/verify-otp',
        element: <OTPPage />
      }
    ],
  },
]);
