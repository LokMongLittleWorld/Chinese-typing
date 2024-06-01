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
          <Model.Content>{RenderContent()}</Model.Content>
        </div>
      </div>
    </Model>
  );
}

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
