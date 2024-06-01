import React from "react";

export default function SpecialButton({
  text,
  onClick,
  className,
  type,
  isLoading,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-gray-200 bg-blue-500 h-12 items-center justify-center rounded-lg px-6 font-md
      ${className} ${
        isLoading
          ? "opacity-80"
          : "hover:animate-shimmer transition hover:text-white hover:bg-[linear-gradient(110deg,#3b82f6,45%,#7dd3fc,55%,#3b82f6)] hover:bg-[length:200%_100%]"
      }`}
      disabled={isLoading}
    >
      {text}
    </button>
  );
}
