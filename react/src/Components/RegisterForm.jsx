import Input from "./Input.jsx";
import SpecialButton from "./SpecialButton.jsx";
import React from "react";
import ContinueWithGoogleButton from "./ContinueWithGoogleButton.jsx";

export default function RegisterForm({
  handleRegisterSubmit,
  handleLogin,
  nameRef,
  emailRef,
  passwordRef,
  passwordConfirmationRef,
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
        onSubmit={(e) => handleRegisterSubmit(e)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          label="用戶名"
          innerRef={nameRef}
          placeholder="username"
          type="text"
          error={errors?.username}
          required
        />
        <Input
          label="你嘅電郵"
          innerRef={emailRef}
          placeholder="email Address"
          type="email"
          error={errors?.email}
          required
        />
        <Input
          label="密碼"
          innerRef={passwordRef}
          placeholder="password"
          type="password"
          error={errors?.password}
          required
        />
        <Input
          label="入多次密碼"
          innerRef={passwordConfirmationRef}
          placeholder="password confirmation"
          type="password"
          error={errors?.password_confirmation}
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
            <span>己經有帳號？</span>
            <span
              onClick={handleLogin}
              className="cursor-pointer text-blue-400 hover:text-blue-600 border-b border-blue-400 hover:border-blue-600"
            >
              馬上登入！
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
