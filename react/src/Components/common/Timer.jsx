export default function Timer({
  displayTimeType, // countUp / countDown
  time = 0,
}) {
  const handleTimeDisplay = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTimeDisplayColor = (time) => {
    if (displayTimeType === "countUp") {
      return "text-emerald-500";
    }

    if (time < 10) {
      return "text-red-500";
    } else if (time < 30) {
      return "text-orange-400";
    } else {
      return "text-emerald-500";
    }
  };
  return (
    <div className="flex flex-row items-center justify-center bg-gray-200 py-1 px-2 rounded-lg select-none">
      {/*<div className="flex bg-gray-300 w-[3px] h-[25px] rounded-lg mr-2"></div>*/}
      <div className="text-2xl text-gray-700">時間：</div>
      <div
        className={`text-2xl text-emerald-500 w-[30px] ${handleTimeDisplayColor(
          time
        )}`}
      >
        {handleTimeDisplay(time)}
      </div>
    </div>
  );
}
