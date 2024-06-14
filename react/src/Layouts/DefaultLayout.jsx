import { Link, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { isStringValid } from "../common/function.js";
import LoginButton from "../Components/authentication/LoginButton.jsx";
import UserAccountDropdownMenu from "../Components/authentication/UserAccountDropdownMenu.jsx";

const pages = {
  "speed-typing": "中文速打",
  "cangjie": "倉頡練習",
  "jyutping": "粵拼練習",
};
export default function DefaultLayout() {
  const { user, token, setUser, setShowAuthenticationModel } =
    useStateContext();

  const { pathname } = useLocation();

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
    <div id="defaultLayout" className="w-full py-6">
      <header className="flex flex-col justify-center items-center mt-2">
        <div className="relative flex flex-row">
          {/*nav bar*/}
          <div className="flex flex-row gap-10 text-4xl font-bold">
            {Object.entries(pages).map(([key, value]) => {
              return (
                <Link
                  key={key}
                  to={"/" + key}
                  className={`hover:text-blue-300 hover:-translate-y-0.5 transition-all duration-500 select-none ${
                    pathname.startsWith("/" + key)
                      ? "text-blue-500"
                      : "text-black"
                  }`}
                >
                  {value}
                </Link>
              );
            })}
          </div>
          {/*user*/}
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
  );
}
