import React, { useEffect } from "react";
import Input from "./Input.jsx";

export default function InvisibleInput({
  handleKeyDown,
  handleChange,
  stayFocus = true,
  inputRef,
}) {
  useEffect(() => {
    // Focus on the input element after it renders
    inputRef.current.focus();
  }, []);
  return (
    <Input
      handleKeyDown={handleKeyDown}
      handleChange={handleChange}
      className="opacity-0 cursor-default"
      onBlur={(e) => e.target.focus()}
      inputRef={inputRef}
    />
  );
}
