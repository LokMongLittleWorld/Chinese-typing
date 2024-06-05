import Model from "./Model.jsx";
import React, { useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import toast from "react-hot-toast";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import ForgotPasswordForm from "./ForgotPasswordForm.jsx";

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
  const [ForgotPasswordTextDisplay, setForgotPasswordTextDisplay] =
    useState("發送驗證電郵");
  const [isGmail, setIsGmail] = useState(false);

  const resetForm = () => {
    if (nameRef.current) nameRef.current.value = null;
    if (emailRef.current) emailRef.current.value = null;
    if (passwordRef.current) passwordRef.current.value = null;
    //prettier-ignore
    if (passwordConfirmationRef.current) passwordConfirmationRef.current.value = null;
    setForgotPasswordTextDisplay("發送驗證電郵");
    setIsLoading(false);
    setErrors({});
  };

  const handleOnClick = () => {
    setContent("login");
    setShowModal(false);
    resetForm();
  };
  const handleRegister = () => {
    setContent("register");
    resetForm();
  };

  const handleLogin = () => {
    setContent("login");
    resetForm();
  };

  const handleForgotPassword = () => {
    setContent("forgotPassword");
    resetForm();
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

  const handleForgotPasswordSubmit = (e) => {
    setIsGmail(false);
    e.preventDefault();
    toast("功能未完成");
    setForgotPasswordTextDisplay("重新發送驗證電郵");
    setIsLoading(true);
    //count down 60s to resend email
    setTimeout(() => {
      setIsLoading(false);
    }, 60 * 1000);

    //check if email is gmail
    if (emailRef.current.value.includes("@gmail")) {
      setIsGmail(true);
    }
  };

  const handleBackToLogin = () => {
    setContent("login");
    resetForm();
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
      case "forgotPassword":
        return (
          <ForgotPasswordForm
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            handleBackToLogin={handleBackToLogin}
            ForgotPasswordTextDisplay={ForgotPasswordTextDisplay}
            emailRef={emailRef}
            errors={errors}
            isLoading={isLoading}
            isGmail={isGmail}
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
          <div className="relative w-[300px] border-r max-md:hidden min-h-[400px]">
            {/*TODO: background effect*/}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-gray-700">
              {"捉緊中字".split("").map((char, index) => {
                return (
                  <div key={index} className="mb-4">
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
            <div className="relative text-gray-700 p-4 w-[450px] min-h-[400px]">
              {RenderContent()}
            </div>
          </Model.Content>
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
