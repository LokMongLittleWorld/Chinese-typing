import radicalsWithCategory from "../../static/cangjie/radicalsWithCategory.json";

export default function RadicalsDisplay({ keysRecord }) {
  const handleTextColor = (speed) => {
    if (speed === 0) {
      return "text-gray-300";
    }
    if (speed < 40) {
      return "text-gray-400";
    }
    if (speed < 60) {
      return "text-gray-500";
    }
    if (speed < 80) {
      return "text-gray-600";
    }
    return "text-gray-700";
  };

  return (
    <div className="flex flex-row justify-center mt-2 gap-4 select-none">
      {Object.entries(radicalsWithCategory).map(([key, value], index) => {
        return (
          <div className="group flex flex-col relative text-2xl" key={index}>
            <div
              className="flex flex-row rounded-md gap-2 p-1
              group-hover:bg-gray-200"
            >
              {Object.entries(value).map(([radical, key], index) => {
                return (
                  <div
                    key={index}
                    className={`${handleTextColor(
                      keysRecord?.Record[key]?.speed || 0
                    )}`}
                  >
                    {radical}
                  </div>
                );
              })}
            </div>
            <div className="group-hover:opacity-100 transition-opacity text-center mt-2 p-1 bg-gray-200 rounded-md text-gray-700 opacity-0">
              {key}
            </div>
          </div>
        );
      })}
    </div>
  );
}
