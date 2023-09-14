import React from "react";

export default function Character({
  shouldTransition,
  currentRadicalStatus,
  character,
}) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] xl:text-[400px] 2xl:text-[500px] cursor-default select-none -z-10
          ${
            shouldTransition ? "transition-colors duration-500 ease-in-out" : ""
          }
          ${
            currentRadicalStatus === "correct"
              ? "text-black"
              : currentRadicalStatus === "wrong"
              ? "text-rose-400"
              : "text-gray-500"
          }`}
    >
      {character}
    </div>
  );
}
