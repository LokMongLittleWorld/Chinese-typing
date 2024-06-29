import { Link, useLocation } from "react-router-dom";
import { isStringValid } from "../common/function.js";
import UserAccountDropdownMenu from "../Components/authentication/UserAccountDropdownMenu.jsx";
import LoginButton from "../Components/authentication/LoginButton.jsx";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function Header() {
  const { token, setShowAuthenticationModel } = useStateContext();
  const pages = {
    "speed-typing": "中文速打",
    "cangjie": "倉頡練習",
    "jyutping": "粵拼練習",
  };

  const { pathname } = useLocation();
  const handleLoginOnClick = () => {
    setShowAuthenticationModel(true);
  };

  return (
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
  );
}
