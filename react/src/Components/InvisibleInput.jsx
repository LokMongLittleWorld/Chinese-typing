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
      className="cursor-default absolute h-2 w-2 bottom-0 z-[-10] opacity-0"
      onBlur={(e) => e.target.focus()}
      inputRef={inputRef}
    />
  );
}
