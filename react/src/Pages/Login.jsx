import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const [errors, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const handleSubmit = () => {
    console.log(errors);

    const values = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", values)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        //auto redirect to home
      })
      .catch((error) => {
        try {
          const response = error.response;
          if (response && response.status === 422) {
            console.log("login error 1", response.data.message);
            setErrors(response.data);
          }
        } catch (error) {
          console.log("login error 2", error);
          setErrors(error);
        }
      });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg">
      <div>Login</div>
      <input ref={emailRef} type="email" placeholder="Email Address" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button
        onClick={handleSubmit}
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Submit
      </button>
      {errors &&
        Object.entries(errors).map(([key, value]) => (
          <div key={key} className="text-red-500">
            {key} {value}
          </div>
        ))}
    </div>
  );
}
