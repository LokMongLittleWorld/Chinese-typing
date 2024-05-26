import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user, setUser, setToken } = useStateContext();
  const handleSubmit = () => {
    axiosClient
      .post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
        toast.success("登出成功~.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <button
      onClick={handleSubmit}
      type="button"
      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {user.name}
    </button>
  );
}
