import { createBrowserRouter } from "react-router-dom";
//layout
import AppLayout from "../components/layout/AppLayout";
import AuthLayout from "../components/layout/AuthLayout";
import UserLayout from "../components/layout/UserLayout";
//pages
import LandingPage from "../pages/landing/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import { MainLayout } from "../components/common";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OTPPage from "../pages/auth/OTPPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import UserSettingsPage from "../pages/user/UserSettingsPage";
import FavoritePage from "../pages/user/FavoritePage";
import HistoryPage from "../pages/user/HistoryPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
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
        ]
      },
      {
        element: <UserLayout/>,
        children: [
          {
            path: '/profile',
            element: <UserProfilePage />,
            children: [
              {
                index: true,
                path: 'settings',
                element: <UserSettingsPage />
              },
              {
                path: 'history',
                element: <HistoryPage />
              },
              {
                path: 'favorite',
                element: <FavoritePage />
              }
            ]
          }
        ]
      }
    ],
  },
]);
