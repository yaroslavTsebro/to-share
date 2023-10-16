import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import EditPost from "../pages/EditPost/EditPost";
import MainPage from "../pages/MainPage/MainPage";
import { Layout } from "../components/Layout/Layout";
import AboutUs from "../pages/AboutUs/AboutUs";
import { Slider } from "../components/Slider/Slider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: "/editor",
        element: <EditPost />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/slider",
    element: <Slider />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
