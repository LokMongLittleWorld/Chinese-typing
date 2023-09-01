import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Users from "./Pages/Users.jsx";
import NotFound from "./Pages/NotFound.jsx";
import DefaultLayout from "./Layouts/DefaultLayout.jsx";
import GuestLayout from "./Layouts/GuestLayout.jsx";
import Home from "./Pages/Home.jsx";
import Index from "./Pages/Cangjie/index.jsx";
import InitialPractice from "./Pages/Jyutping/InitialPractice.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cangjie",
        children: [
          {
            path: "",
            element: <Index />,
          },
          {
            path: "radical-practice",
            element: <Index />,
          },
        ],
      },
      {
        path: "/jyutping",
        children: [
          {
            path: "",
            element: <InitialPractice />,
          },
          {
            path: "initial-practice",
            element: <InitialPractice />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
