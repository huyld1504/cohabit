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
import PostDetailPage from "../pages/admin/PostDetailPage";
import PremiumPage from "../pages/premium/PremiumPage";
import PremiumPaymentPage from "../pages/premium/PremiumPaymentPage";
import PremiumPaymentDetailPage from "../pages/premium/PremiumPaymentDetailPage";
import UserPostDetailPage from "../pages/user-posts/UserPostDetailPage";
import UserPostManagementPage from "../pages/user-posts/UserPostManagementPage";
import CreatePostPage from "../pages/user-posts/CreatePostPage";
import RentedPostsPage from "../pages/user-posts/RentedPostsPage";
import RentalManagementPage from "../pages/user-posts/RentalManagementPage";
import ChatPage from "../pages/chat/ChatPage";
import ContractsPage from "../pages/contracts/ContractsPage";
import ComingSoonPage from "../pages/ComingSoonPage";
import FeedbackListPage from "../pages/feedback/FeedbackListPage";

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
          // Contracts - public access
          {
            path: "contracts",
            element: <ContractsPage />,
          },
          // Coming Soon - public access
          {
            path: "coming-soon",
            element: <ComingSoonPage />,
          },
          // Feedbacks - public access
          {
            path: "feedbacks",
            element: <FeedbackListPage />,
          },
        ]
      },
      // Premium - public access (login required for actions)
      {
        element: <PremiumLayout />,
        children: [
          {
            path: 'premium',
            element: <PremiumPage />
          },
          {
            path: 'premium/payment-detail/:plan',
            element: <PremiumPaymentDetailPage />
          },
          {
            path: 'premium/payment',
            element: <PremiumPaymentPage />
          }
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
          // Routes with MainLayout (Header + Footer)
          {
            element: <MainLayout />,
            children: [
              // Chat routes (Plus/Pro only)
              {
                path: 'chat',
                element: <ChatPage />
              }
            ]
          },
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
                index: true,
                element: <UserPostManagementPage />
              },
              {
                path: 'user/posts',
                element: <UserPostManagementPage />,
              },
              {
                path: 'user/posts/create',
                element: <CreatePostPage />,
              },
              {
                path: 'user/posts/rented',
                element: <RentedPostsPage />,
              },
              {
                path: 'user/posts/:postId',
                element: <UserPostDetailPage />,
              },
              {
                path: 'user/rentals',
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
              },
              {
                path: 'admin/posts/:postId',
                element: <PostDetailPage />
              }
            ]
          },
          // Chat routes (Plus/Pro only)
          {
            path: 'chat',
            element: <ChatPage />
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
