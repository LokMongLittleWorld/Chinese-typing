import Input from "./Input.jsx";
import SpecialButton from "./SpecialButton.jsx";
import React from "react";

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
    <form
      onSubmit={(e) => handleRegisterSubmit(e)}
      className="flex flex-col line-clamp-3 text-gray-700 gap-4 p-4 w-[450px]"
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
  );
}
