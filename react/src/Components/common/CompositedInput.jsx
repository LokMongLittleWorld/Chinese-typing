import { useRef } from "react";

const CompositedInput = ({
  inputRef,
  handleOnChange,
  className,
  onBlur,
  handleKeyDown,
  handleInputDisplayOnChange,
}) => {
  // Add a state to track Chinese input state
  const compositionRef = useRef(false);

  const preHandleChange = (e) => {
    handleInputDisplayOnChange(e.target.value);
    if (!compositionRef.current && handleOnChange !== undefined) {
      handleOnChange(e);
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

export default CompositedInput;
