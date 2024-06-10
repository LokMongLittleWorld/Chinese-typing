import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isStringValid } from "../../common/function.js";
import axios from "axios";

export default function Callback() {
  const [errors, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigateTo = useNavigate();

  const loginCode = searchParams.get("loginCode");
  const mailVerify = searchParams.get("mailVerify");

  useEffect(() => {
    // login callback
    if (isStringValid(loginCode)) {
      const values = {
        loginCode: decodeURI(loginCode),
      };
      axiosClient
        .post("/callbackLogin", values)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
          navigateTo("/");
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

    // email verification callback
    if (isStringValid(mailVerify)) {
      const verify_url = decodeURI(mailVerify);
      axios
        .create({
          baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
        })
        .get(verify_url)
        .then(({ data }) => {
          navigateTo("/");
        })
        .catch((error) => {
          try {
            const response = error.response;
            if (response && response.status === 403) {
              console.log("invalid link", response.data.message);
              setErrors(response.data);
            }
          } catch (error) {
            console.log("login error 2", error);
            setErrors(error);
          }
        });
    }
  }, []);

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
