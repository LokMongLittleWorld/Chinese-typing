import { createBrowserRouter } from "react-router-dom";
import Users from "./Pages/Users.jsx";
import NotFound from "./Components/NotFound.jsx";
import DefaultLayout from "./Layouts/DefaultLayout.jsx";
import Index from "./Pages/speed-typing/Index.jsx";
import CangjieIndex from "./Pages/cangjie/Index.jsx";
import JyutpingIndex from "./Pages/jyutping/Index.jsx";
import Detail from "./Pages/speed-typing/Detail.jsx";
import CreateOrEdit from "./Pages/speed-typing/article/CreateOrEdit.jsx";
import ArticleIndex from "./Pages/speed-typing/article/Index.jsx";
import Test from "./Pages/test.jsx";
import Login from "./Pages/Authentication/Login.jsx";
import Register from "./Pages/Authentication/Register.jsx";
import Callback from "./Pages/Authentication/Callback.jsx";
import Profile from "./Pages/User/Profile.jsx";
import Settings from "./Pages/User/Settings.jsx";

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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
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
        path: "/callback",
        element: <Callback />,
      },
    ],
  },
  // {
  //   path: "/",
  //   children: [
  //     {
  //       path: "/callback",
  //       element: <Callback />,
  //     },
  //   ],
  // },
]);

export default router;
