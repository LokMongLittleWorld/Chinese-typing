import React, { useEffect, useRef } from "react";

export default function InvisibleInput({ handleKeyDown, stayFocus = true }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input element after it renders
    inputRef.current.focus();
  }, []);
  return (
    <input
      ref={inputRef}
      onKeyDown={handleKeyDown}
      className="opacity-0 cursor-default"
      onBlur={(e) => e.target.focus()}
    />
  );
}
