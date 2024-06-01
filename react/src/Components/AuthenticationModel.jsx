import Model from "./Model.jsx";
import React, { useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import toast from "react-hot-toast";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

export default function AuthenticationModel({
  showModal = true,
  setShowModal,
}) {
  const { setUser, setToken } = useStateContext();
  const [content, setContent] = useState("login");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleContinueWithGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/auth/google/redirect`;
  };
  const handleOnClick = () => {
    setShowModal(false);

    //reset form
    nameRef.current.value = null;
    emailRef.current.value = null;
    passwordRef.current.value = null;
    passwordConfirmationRef.current.value = null;
    setErrors({});
  };
  const handleRegister = () => {
    setContent("register");

    //reset form
    emailRef.current.value = null;
    passwordRef.current.value = null;
    setErrors({});
  };

  const handleLogin = () => {
    setContent("login");

    //reset form
    nameRef.current.value = null;
    emailRef.current.value = null;
    passwordRef.current.value = null;
    passwordConfirmationRef.current.value = null;
    setErrors({});
  };

  const handleForgotPassword = () => {
    toast("forgot password");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const values = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", values)
      .then(({ data }) => {
        setShowModal(false);
        setUser(data.user);
        setToken(data.token);
        toast.success("成功登入！");
      })
      .catch((error) => {
        try {
          const response = error.response;
          if (response && response.status === 422) {
            response.data.message === "Invalid credentials" &&
              toast.error("電郵、用戶名或密碼錯誤！");
            setErrors(response.data.errors);
          }
        } catch (error) {
          toast.error("login error");
          setErrors(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setErrors({
        ...errors,
        password_confirmation: "Inconsistent with the password",
      });
      return;
    }

    setIsLoading(true);
    const values = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/register", values)
      .then(({ data }) => {
        toast.success("成功註冊！");
        setShowModal(false);
        setUser(data.user);
        setToken(data.token);
        //auto redirect to home
      })
      .catch((error) => {
        try {
          const response = error.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        } catch (error) {
          toast.error("register error");
          setErrors(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const RenderContent = () => {
    switch (content) {
      case "login":
        return (
          <LoginForm
            handleLoginSubmit={handleLoginSubmit}
            handleRegister={handleRegister}
            handleForgotPassword={handleForgotPassword}
            emailRef={emailRef}
            passwordRef={passwordRef}
            isLoading={isLoading}
            errors={errors}
          />
        );
      case "register":
        return (
          <RegisterForm
            handleRegisterSubmit={handleRegisterSubmit}
            handleLogin={handleLogin}
            nameRef={nameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            passwordConfirmationRef={passwordConfirmationRef}
            isLoading={isLoading}
            errors={errors}
          />
        );
      default:
        return (
          <LoginForm
            handleLoginSubmit={handleLoginSubmit}
            handleRegister={handleRegister}
            handleForgotPassword={handleForgotPassword}
            emailRef={emailRef}
            passwordRef={passwordRef}
            isLoading={isLoading}
            errors={errors}
          />
        );
    }
  };

  return (
    <Model showModal={showModal}>
      <div className="flex flex-row">
        <Model.Side>
          <div className="relative w-[300px] border-r max-md:hidden">
            {/*TODO: background effect*/}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-gray-700">
              {"中文打字".split("").map((char, index) => {
                return (
                  <div key={index} className="mb-2">
                    {char}
                  </div>
                );
              })}
            </div>
          </div>
        </Model.Side>
        <div>
          <Model.Header handleOnClick={handleOnClick} title="觀迎返嚟~" />
          <Model.Content>
            <div className="text-gray-700 p-4 w-[450px]">
              <div className="flex flex-col gap-4 items-center justify-center">
                <div
                  onClick={handleContinueWithGoogle}
                  className="rounded-lg h-12 bg-white flex flex-row gap-2 items-center justify-center border tracking-wider cursor-pointer w-full transition-colors duration-300 hover:bg-gray-100 hover:border-gray-400"
                >
                  <GoogleLogo className="w-6 h-6" />
                  以google帳號繼續
                </div>
                <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700 w-[80%]" />
                {RenderContent()}
              </div>
            </div>
          </Model.Content>
        </div>
      </div>
    </Model>
  );
}

const GoogleLogo = ({ className }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 48 48">
        <title>Google Logo</title>
        <clipPath id="g">
          <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
        </clipPath>
        <g className="colors" clipPath="url(#g)">
          <path fill="#FBBC05" d="M0 37V11l17 13z" />
          <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
          <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
          <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
        </g>
      </svg>
    </div>
  );
};

const descriptionTmp =
  "歡迎來到我們的中文打字平台！這是一個專門為中文打字練習和提升打字速度而設計的網站。無論你是初學者還是打字高手，我們的平台都能夠幫助你提高中文打字的準確度和速度。";

const featuresTmp = [
  "打字練習： 各種難度的練習內容。",
  "即時反饋： 實時顯示錯誤。",
  "打字測試： 定期測試打字速度。",
  "排行榜： 全球打字競賽。",
  "個性化設置： 支援多種輸入法和自定義界面。",
];

const descriptionTmp2 = "快來加入我們，享受打字樂趣吧！";
