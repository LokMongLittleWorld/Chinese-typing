import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Users from "./Pages/Users.jsx";
import NotFound from "./Components/NotFound.jsx";
import DefaultLayout from "./Layouts/DefaultLayout.jsx";
import GuestLayout from "./Layouts/GuestLayout.jsx";
import Index from "./Pages/speed-typing/Index.jsx";
import CangjieIndex from "./Pages/cangjie/index.jsx";
import JyutpingIndex from "./Pages/jyutping/Index.jsx";
import Detail from "./Pages/speed-typing/Detail.jsx";
import CreateOrEdit from "./Pages/speed-typing/article/CreateOrEdit.jsx";
import ArticleIndex from "./Pages/speed-typing/article/Index.jsx";
import Test from "./Pages/test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/speed-typing",
        element: <Index />,
      },
      {
        path: "/speed-typing/:id",
        element: <Detail />,
      },
      {
        path: "/cangjie",
        children: [
          {
            path: "",
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
      {
        path: "/article",
        children: [
          {
            path: "",
            element: <ArticleIndex />,
          },
          {
            path: "create",
            element: <CreateOrEdit />,
          },
          {
            path: ":id",
            element: <CreateOrEdit />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
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
