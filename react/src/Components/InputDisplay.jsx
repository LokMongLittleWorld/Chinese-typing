import React from "react";

export default function InputDisplay({
  answer,
  input,
  currentWordIndex,
  currentWordStatus,
}) {
  return (
    <>
      {answer.length > 1 && (
        <div className="flex flex-row items-end gap-4">
          {[...answer].map((char, index) => {
            const isLastWrong =
              currentWordStatus === "wrong" && index === input.length - 1;
            return (
              <div
                key={`${index}-${currentWordIndex}`}
                className="flex flex-col items-center"
              >
                <div
                  className={`font-nunito text-4xl ${
                    isLastWrong ? "text-rose-400" : ""
                  }`}
                >
                  {input[index]}
                </div>
                <div className="w-8 h-[3px] rounded-full bg-gray-600" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
