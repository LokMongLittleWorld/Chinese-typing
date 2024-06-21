import React from "react";

export default function ResultDisplayCard({ className, title, text, unit }) {
  return (
    // TODO: display text in different color
    <div
      className={`
        ${className}
        flex flex-col bg-white rounded-lg shadow h-full p-2 select-none
        border-4 border-blue-500/0 hover:border-blue-500/70
        transform hover:translate-y-1 transition`}
    >
      <div className="text-sm text-gray-700">{title}:</div>
      <div className="flex flex-row gap-1 justify-end items-baseline">
        <div className="text-6xl text-gray-700">{text}</div>
        <div className="text-sm text-gray-700">{unit}</div>
      </div>
    </div>
  );
}
