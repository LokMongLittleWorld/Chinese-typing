import Input from "./Input.jsx";
import SpecialButton from "./SpecialButton.jsx";
import React from "react";
import ContinueWithGoogleButton from "./ContinueWithGoogleButton.jsx";

export default function LoginForm({
  handleLoginSubmit,
  handleRegister,
  handleForgotPassword,
  emailRef,
  passwordRef,
  isLoading,
  errors,
}) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <ContinueWithGoogleButton />
      {/*divider*/}
      <div className="flex flex-row items-center justify-between gap-4 -my-2">
        <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700 w-[150px]" />
        <div className="text-gray-400 dark:text-gray-600">或者</div>
        <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700 w-[150px]" />
      </div>
      <form
        onSubmit={(e) => handleLoginSubmit(e)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          label="你嘅電郵/用戶名"
          innerRef={emailRef}
          placeholder="email Address／username"
          type="string"
          error={errors?.email}
          required
        />
        <Input
          label="密碼"
          innerRef={passwordRef}
          placeholder="password"
          type="new-password"
          error={errors?.password}
          required
        />
        <SpecialButton
          type="submit"
          className="mt-2"
          text="搖滾準備！"
          isLoading={isLoading}
        />

        <div className="flex items-center justify-between">
          <div className="text-md -mt-1">
            <span>仲未有帳號？</span>
            <span
              onClick={handleRegister}
              className="cursor-pointer text-blue-400 hover:text-blue-600 border-b border-blue-400 hover:border-blue-600"
            >
              馬上註冊！
            </span>
          </div>
          <div
            onClick={handleForgotPassword}
            className="text-md -mt-1 cursor-pointer text-blue-400 hover:text-blue-600 border-b border-blue-400 hover:border-blue-600"
          >
            忘記密碼？
          </div>
        </div>
      </form>
    </div>
  );
}
