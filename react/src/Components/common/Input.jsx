import React from "react";

export default function Input({
  label,
  innerRef,
  placeholder,
  type,
  error,
  required,
}) {
  return (
    <div>
      <label className="block mb-2 text-lg font-medium text-gray-900">
        {label}{" "}
        {error && <span className="text-rose-400 text-sm">{error}</span>}
      </label>
      <input
        ref={innerRef}
        type={type}
        className="bg-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 border border-gray-300 focus:ring-transparent focus:border-gray-300"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
