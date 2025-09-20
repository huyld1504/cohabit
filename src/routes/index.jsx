import { createBrowserRouter } from "react-router-dom";

//layout
import AppLayout from "../components/layouts/AppLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import UserLayout from "../components/layouts/UserLayout";
import PropertyLayout from "../components/layouts/PropertyLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import PremiumLayout from "../components/layouts/PremiumLayout";
import MainLayout from "../components/layouts/MainLayout";

//pages
import LandingPage from "../pages/landing/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OTPPage from "../pages/auth/OTPPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import UserSettingsPage from "../pages/user/UserSettingsPage";
import UserProfileUpdatePage from "../pages/user/UserProfileUpdatePage";
import FavoritePage from "../pages/user/FavoritePage";
import HistoryPage from "../pages/user/HistoryPage";
import PropertyListingPage from "../pages/properties/PropertyListingPage";
import PropertyDetailPage from "../pages/properties/PropertyDetailPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagementPage from "../pages/admin/UserManagementPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import RentalHistoryPage from "../pages/admin/RentalHistoryPage";
import PostManagementPage from "../pages/admin/PostManagementPage";
import PremiumPage from "../pages/premium/PremiumPage";
import PaymentPage from "../pages/payment/PaymentPage";


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
          {
            path: "unauthorized",
            element: <UnauthorizedPage />,
          },
          {
            element: <PropertyLayout />,
            children: [
              {
                path: "properties",
                element: <PropertyListingPage />,
              },
              {
                path: "properties/:id",
                element: <PropertyDetailPage />,
              },
            ]
          }
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          },
          {
            path: 'verify-otp',
            element: <OTPPage />
          }
        ]
      },
      {
        element: <UserLayout />,
        children: [
          {
            path: 'profile',
            element: <UserProfilePage />,
            children: [
              {
                index: true,
                path: 'settings',
                element: <UserSettingsPage />
              },
              {
                path: 'update',
                element: <UserProfileUpdatePage />
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
          },
        ]
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: '/admin',
            element: <AdminDashboard />,
          },
          {
            path: '/admin/users',
            element: <UserManagementPage />,
          },
          {
            path: '/admin/rental-history',
            element: <RentalHistoryPage />
          },
          {
            path: 'admin/posts-management',
            element: <PostManagementPage />
          }
        ]
      },
      {
        element: <PremiumLayout />,
        children: [
          {
            path: 'premium',
            element: <PremiumPage />
          },
          {
            path: 'payment/:plan',
            element: <PaymentPage />
          }
        ]
      }
    ],
  },
]);
