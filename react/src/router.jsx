import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Users from "./Pages/Users.jsx";
import NotFound from "./Pages/NotFound.jsx";
import DefaultLayout from "./Layouts/DefaultLayout.jsx";
import GuestLayout from "./Layouts/GuestLayout.jsx";
import Index from "./Pages/SpeedTyping/Index.jsx";
import CangjieIndex from "./Pages/Cangjie/index.jsx";
import JyutpingIndex from "./Pages/Jyutping/Index.jsx";

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
        element: <Index />,
      },
      {
        path: "/home",
        element: <Index />,
      },
      {
        path: "/cangjie",
        children: [
          {
            path: "",
            element: <CangjieIndex />,
          },
          {
            path: "radical-practice",
            element: <CangjieIndex />,
          },
        ],
      },
      {
        path: "/jyutping",
        children: [
          {
            path: "",
            element: <JyutpingIndex />,
          },
          {
            path: "initial-practice",
            element: <JyutpingIndex />,
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
        element: <Index />,
      },
    ],
  },
]);

export default router;
