import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function Register() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [errors, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const handleSubmit = () => {
    console.log(errors);
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    const values = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/register", values)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        //auto redirect to home
      })
      .catch((error) => {
        try {
          const response = error.response;
          if (response && response.status === 422) {
            console.log("register error", response.data.errors);
            setErrors(response.data.errors);
          }
        } catch (error) {
          console.log("register error", error);
          setErrors(error);
        }
      });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg">
      <div>Register</div>
      <input ref={nameRef} type="text" placeholder="Full Name" />
      <input ref={emailRef} type="email" placeholder="Email Address" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input
        ref={passwordConfirmationRef}
        type="password"
        placeholder="Repeat Password"
      />
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
