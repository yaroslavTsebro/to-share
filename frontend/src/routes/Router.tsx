import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import EditPost from "../pages/EditPost/EditPost";
import Main from "../pages/Main/Main";
import { Layout } from "../components/Layout/Layout";
import AboutUs from "../pages/AboutUs/AboutUs";
import { Slider } from "../components/Slider/Slider";
import { Auth } from "../pages/Auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
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
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/slider",
    element: <Slider />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
