import React from "react";

export default function AmountSelector({
  amounts,
  amount,
  setAmount,
  isRunning,
}) {
  return (
    <>
      {!isRunning && (
        <section className="flex flex-row items-center bg-gray-200 gap-6 py-1 px-2 rounded-lg">
          {amounts.map((item) => {
            return (
              <div
                onClick={() => setAmount(item)}
                className={`text-2xl cursor-pointer select-none ${
                  amount === item ? "text-blue-500" : "text-gray-700"
                }`}
                key={item}
              >
                {item}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}
