import Input from "./Input.jsx";
import React from "react";
import SpecialButton from "./SpecialButton.jsx";

export default function ForgotPasswordForm({
  handleForgotPasswordSubmit,
  handleBackToLogin,
  ForgotPasswordTextDisplay,
  emailRef,
  errors,
  isLoading,
  isGmail,
}) {
  const handleOnClick = () => {
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const url = `https://mail.google.com/mail/u/0/#advanced-search/query=chinese+tpying&isrefinement=true&datestart=${today}&daterangetype=custom_range`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <form
        onSubmit={(e) => handleForgotPasswordSubmit(e)}
        className="flex flex-col gap-2 w-full"
      >
        <Input
          label="你嘅電郵"
          innerRef={emailRef}
          placeholder="email Address"
          type="email"
          error={errors?.email}
          required
        />
        <SpecialButton
          type="submit"
          className="mt-2"
          text={ForgotPasswordTextDisplay}
          isLoading={isLoading}
        />
      </form>
      {isLoading && (
        <>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700 w-[400px]" />
          <div className="flex flex-col justify-start gap-2">
            <div>驗證電郵己經發送到你嘅電郵地址，請檢查你嘅電郵。</div>
            {isGmail && (
              <div
                onClick={handleOnClick}
                className="text-md cursor-pointer text-blue-400 hover:text-blue-600 border-b border-blue-400 hover:border-blue-600 w-fit"
              >
                按此打開 Gmail
              </div>
            )}
          </div>
        </>
      )}
      <div className="text-md -mt-1">
        <span
          onClick={handleBackToLogin}
          className="absolute bottom-4 left-4 cursor-pointer text-blue-400 hover:text-blue-600 border-b border-blue-400 hover:border-blue-600"
        >
          返回登入
        </span>
      </div>
    </div>
  );
}
