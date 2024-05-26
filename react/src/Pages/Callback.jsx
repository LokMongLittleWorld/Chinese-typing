import { createRef, useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import { useSearchParams } from "react-router-dom";
import { isStringValid } from "../common/function.js";

export default function Callback() {
  const [errors, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const loginCode = searchParams.get("loginCode");

  // const handleSubmit = () => {
  //   console.log(errors);

  //   const values = {
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   };

  //   axiosClient
  //     .post("/login", values)
  //     .then(({ data }) => {
  //       setUser(data.user);
  //       setToken(data.token);
  //       //auto redirect to home
  //     })
  //     .catch((error) => {
  //       try {
  //         const response = error.response;
  //         if (response && response.status === 422) {
  //           console.log("login error 1", response.data.message);
  //           setErrors(response.data);
  //         }
  //       } catch (error) {
  //         console.log("login error 2", error);
  //         setErrors(error);
  //       }
  //     });
  // };

  useEffect(() => {
    if(isStringValid(loginCode)) {
      const values = {
        loginCode: loginCode,
      };
      axiosClient
        .post("/callbackLogin", values)
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
    }
  },[])

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg">
      {errors &&
        Object.entries(errors).map(([key, value]) => (
          <div key={key} className="text-red-500">
            {key} {value}
          </div>
        ))}
    </div>
  );
}
