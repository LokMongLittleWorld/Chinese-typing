import DropdownMenu from "./DropdownMenu.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import toast from "react-hot-toast";

export default function UserAccountDropdownMenu() {
  const { user, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosClient
      .post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
        toast.success("登出成功~.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <DropdownMenu className="group cursor-pointer">
      <DropdownMenu.Trigger>
        <div className="py-3 px-4 rounded-lg text-white text-center bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-transparent focus:outline-none text-sm">
          <div className="flex flex-row items-center justify-center gap-2 transform group-hover:-translate-y-[1px] transition duration-300">
            <FontAwesomeIcon icon={faUser} />
            {user?.name}
            <FontAwesomeIcon
              icon={faCaretDown}
              className="hs-dropdown-open:rotate-180 transform duration-300"
            />
          </div>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-40 bg-white shadow rounded-lg p-2 mt-2 border-gray-200 text-md text-gray-900">
        <Link
          className="
          flex items-center gap-x-3.5 py-2 px-3 rounded-lg
          hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          to="/profile"
        >
          個人檔案
        </Link>
        <Link
          className="
          flex items-center gap-x-3.5 py-2 px-3 rounded-lg
          hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          to="/settings"
        >
          設定
        </Link>
        <div
          onClick={handleLogout}
          className="
          flex items-center gap-x-3.5 py-2 px-3 rounded-lg
          hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        >
          登出
        </div>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
