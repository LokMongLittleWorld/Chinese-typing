import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import LogoutButton from "../Components/LogoutButton.jsx";

//"中文速打", "倉頡練習", "粵拼練習"
export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();
  const pages = {
    "speed-typing": "中文速打",
    "cangjie": "倉頡練習",
    "jyutping": "粵拼練習",
  };
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || "speed-typing"
  );

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="defaultLayout">
      {/*<aside>*/}
      {/*  <Link to="/dashboard">Dashboard</Link>*/}
      {/*  <Link to="/users">Users</Link>*/}
      {/*</aside>*/}
      <div className="w-full p-6">
        <header className="flex flex-col justify-center items-center mt-2">
          <div className="flex flex-row gap-10 text-4xl font-bold">
            {Object.entries(pages).map(([key, value]) => {
              return (
                <Link
                  onClick={() => {
                    setCurrentPage(key);
                    localStorage.setItem("currentPage", key);
                  }}
                  key={key}
                  to={"/" + key}
                  className={`hover:text-blue-300 hover:-translate-y-0.5 transition-all duration-500 select-none ${
                    currentPage === key ? "text-blue-500" : "text-black"
                  }`}
                >
                  {value}
                </Link>
              );
            })}
          </div>
        </header>
        <div className="fixed top-2 right-2">
          <LogoutButton />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
