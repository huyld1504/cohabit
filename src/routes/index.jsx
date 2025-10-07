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
import UserPostManagementPage from "../pages/user-posts/UserPostManagementPage";
import RentalManagementPage from "../pages/user-posts/RentalManagementPage";
import CreatePostPage from "../pages/user-posts/CreatePostPage";
import RentedPostsPage from "../pages/user-posts/RentedPostsPage";
import RentedPostDetailPage from "../pages/user-posts/RentedPostDetailPage";

// layouts
import UserPostLayout from "../components/layouts/UserPostLayout";
import PublicLayout from "../components/layouts/PublicLayout";


export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      // Public routes - không cần authentication
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "unauthorized",
            element: <UnauthorizedPage />,
          },
          // Properties - public access
          {
            path: "properties",
            element: <PropertyLayout />,
            children: [
              {
                index: true,
                element: <PropertyListingPage />,
              },
              {
                path: ":id",
                element: <PropertyDetailPage />,
              },
            ]
          },
        ]
      },

      // Auth routes - không cần authentication
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          }
        ]
      },

      // Protected routes - cần authentication
      {
        path: "/",
        element: <AppLayout />,
        children: [
          // User Profile routes
          {
            path: 'profile',
            element: <UserLayout />,
            children: [
              {
                index: true,
                element: <UserSettingsPage />
              },
              {
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
          {
            element: <UserPostLayout />,
            children: [
              {
                path: '/user/posts',
                element: <UserPostManagementPage />,
              },
              {
                path: '/user/posts/create',
                element: <CreatePostPage />,
              },
              {
                path: '/user/posts/rented',
                element: <RentedPostsPage />,
              },
              {
                path: '/user/posts/rented/:id',
                element: <RentedPostDetailPage />,
              },
              {
                path: '/user/rentals',
                element: <RentalManagementPage />,
              },
              // Add more user post management routes here
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

      // Catch all cho 404
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ]
  }
]);
