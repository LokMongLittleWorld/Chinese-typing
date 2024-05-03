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
      className="cursor-default opacity-0 absolute bottom-0"
      onBlur={(e) => e.target.focus()}
      inputRef={inputRef}
    />
  );
}
