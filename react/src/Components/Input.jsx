import { useRef } from "react";

const Input = ({
  inputRef,
  handleChange,
  className,
  onBlur,
  handleKeyDown,
}) => {
  // Add a state to track Chinese input state
  const compositionRef = useRef(false);

  const preHandleChange = (e) => {
    if (!compositionRef.current && handleChange !== undefined) {
      handleChange(e);
    }
  };

  const handleComposition = (e) => {
    if (e.type === "compositionend") {
      compositionRef.current = false;
      preHandleChange(e);
    } else {
      compositionRef.current = true;
    }
  };

  return (
    <input
      ref={inputRef}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      className={className}
      onChange={preHandleChange}
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
      onCompositionUpdate={handleComposition}
    />
  );
};

export default Input;
