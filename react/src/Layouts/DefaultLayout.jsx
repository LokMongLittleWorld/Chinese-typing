import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import LogoutButton from "../Components/LogoutButton.jsx";
import { isStringValid } from "../common/function.js";

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

  const handleOnClick = () => {
    if (!token) {
      setShowAuthenticationModel(true);
    }
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
            <button
              onClick={handleOnClick}
              type="button"
              className="fixed right-8 hover:bg-[length:200%_100%] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-transparent focus:outline-none font-md rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {!token ? "登入" : user.name}
            </button>
          </div>
        </header>
        <div className="fixed bottom-2 right-2">
          <LogoutButton />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
