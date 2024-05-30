import { useState } from "react";
import axiosClient from "../axios-client.js";
import toast from "react-hot-toast";

function ReVerifyButton() {
  const [allowResend, setAllowResend] = useState(true);
  const handleSubmit = () => {
    setAllowResend(false);
    axiosClient
      .get("/reverify")
      .then(() => {
        toast.success("驗證郵件發送");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setTimeout(() => setAllowResend(true), 60000);
      });
  };
  return (
    <button
      disabled={!allowResend}
      onClick={handleSubmit}
      type="button"
      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {"重新發送驗證郵件"}
    </button>
  )
}

export default function Users() {
  return (
    <>
      <div>Users</div>
      <ReVerifyButton/>
    </>
  );
}
