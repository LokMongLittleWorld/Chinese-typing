import KBD from "../common/KBD.jsx";
import { useEffect, useState } from "react";

export default function MaskContainer({
  isRunning = false,
  className,
  children,
}) {
  const [delayedIsRunning, setDelayedIsRunning] = useState(isRunning);

  useEffect(() => {
    let timer;
    if (!isRunning) {
      timer = setTimeout(() => {
        setDelayedIsRunning(false);
      }, 3000);
    } else {
      setDelayedIsRunning(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isRunning]);
  return (
    <div
      className={`
        fixed flex items-center justify-center w-full h-screen top-0 -z-10 select-none ${className}`}
    >
      {!delayedIsRunning && (
        <div
          className="
      absolute w-full h-[500px]
      backdrop-blur-lg bg-gray-50/30 z-10
      animate-fade
      flex flex-col gap-4 items-center justify-center
      font-semibold text-4xl"
        >
          <div className="flex flex-row items-center justify-center gay-8 text-gray-700">
            <div>按</div>
            <KBD keyName="Enter" />
            <div>開始</div>
          </div>
          <div className="flex flex-row items-center justify-center gay-8 text-gray-700">
            <div>按</div>
            <KBD keyName="Tab" />
            <div>偷睇 Cheat Sheet </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
