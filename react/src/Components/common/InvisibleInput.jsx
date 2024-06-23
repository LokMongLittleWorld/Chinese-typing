import React, { useEffect } from "react";
import CompositedInput from "./CompositedInput.jsx";

export default function InvisibleInput({
  handleKeyDown,
  handleOnChange,
  handleInputDisplayOnChange,
  stayFocus = true,
  inputRef,
}) {
  useEffect(() => {
    // Focus on the input element after it renders
    inputRef.current.focus();
  }, []);
  return (
    <CompositedInput
      handleKeyDown={handleKeyDown}
      handleOnChange={handleOnChange}
      handleInputDisplayOnChange={handleInputDisplayOnChange}
      className="cursor-default absolute h-2 w-2 bottom-0 z-[-10] opacity-0"
      onBlur={(e) => e.target.focus()}
      inputRef={inputRef}
    />
  );
}
