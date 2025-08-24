import { createBrowserRouter } from "react-router-dom";

//pages
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import { MainLayout } from "../components/common";


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
      }
    ],
  },
]);
