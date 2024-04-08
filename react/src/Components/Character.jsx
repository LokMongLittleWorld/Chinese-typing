import React from "react";

export default function Character({
  shouldTransition,
  currentWordStatus,
  character,
  font = null,
}) {
  return (
    <section
      className={`${character} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] xl:text-[400px] 2xl:text-[500px] cursor-default select-none -z-10
          ${font ? font : ""}
          ${
            currentWordStatus === "correct"
              ? "text-gray-700"
              : currentWordStatus === "wrong" && shouldTransition
              ? "text-rose-400"
              : "text-gray-500"
          }`}
    >
      {character}
    </section>
  );
}
