import React from "react";

export default function InputDisplay({
  answer,
  input,
  isRunning,
  currentRadicalIndex,
}) {
  return (
    <>
      {isRunning && answer.length > 1 && (
        <div className="flex flex-row items-end gap-4">
          {[...answer].map((char, index) => {
            // console.log(input);
            return (
              <div
                key={`${index}-${currentRadicalIndex}`}
                className="flex flex-col items-center"
              >
                <div className="font-nunito text-4xl">{input[index]}</div>
                <div className="w-8 h-[3px] rounded-full bg-gray-600" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
