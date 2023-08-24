import { useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function Register() {
  const [values, setValues] = useState({
    username: "123",
    email: "123123123@gmail.com",
    password: "123123123",
    password_confirmation: "123123123",
  });

  const { setUser, setToken } = useStateContext();

  const handleSubmit = () => {
      // axiosClient.get("/test").then(({ data }) => {
      //   console.log(data);
      // });
    axiosClient
      .post("/register", values)
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        setToken(data.token);
        //auto redirect to home
      })
      .catch((error) => {
        try {
          const response = error.response;
          if (response && response.status === 422) {
            console.log("register error", response.data.errors);
          }
        } catch (error) {
          console.log("register error", error);
        }
      });
  };
  return (
    <div>
      <div>Register</div>
      <button
        onClick={handleSubmit}
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Submit
      </button>
    </div>
  );
}
