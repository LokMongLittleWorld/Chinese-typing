import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import { isStringValid } from "../common/function.js";
import LoginButton from "../Components/LoginButton.jsx";
import UserAccountDropdownMenu from "../Components/UserAccountDropdownMenu.jsx";

//"中文速打", "倉頡練習", "粵拼練習"
export default function DefaultLayout() {
  const { user, token, setUser, setShowAuthenticationModel } =
    useStateContext();
  const pages = {
    "speed-typing": "中文速打",
    "cangjie": "倉頡練習",
    "jyutping": "粵拼練習",
  };
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("currentPage") || "speed-typing"
  );

  useEffect(() => {
    if (isStringValid(token)) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  const handleLoginOnClick = () => {
    setShowAuthenticationModel(true);
  };

  return (
    <div id="defaultLayout">
      <div className="w-full p-6">
        <header className="flex flex-col justify-center items-center mt-2">
          <div className="relative flex flex-row">
            <div className="flex flex-row gap-10 text-4xl font-bold">
              {Object.entries(pages).map(([key, value]) => {
                return (
                  <Link
                    onClick={() => {
                      setCurrentPage(key);
                      sessionStorage.setItem("currentPage", key);
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
            <div className="fixed right-8 z-40">
              {isStringValid(token) ? (
                <UserAccountDropdownMenu />
              ) : (
                <LoginButton handleOnClick={handleLoginOnClick} />
              )}
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
