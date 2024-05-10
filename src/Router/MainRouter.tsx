import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Test from "../Pages/Test";

const LoadingScreen = React.lazy(
  () => import("../Components/Static/LoadingScreen")
);

const Layout = React.lazy(() => import("../Components/LayoutHolder/Layout"));

const Todo = React.lazy(() => import("../Pages/Todo"));

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Todo />
          </Suspense>
        ),
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);
