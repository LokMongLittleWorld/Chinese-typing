import radicalsWithCategory from "../../static/cangjie/radicalsWithCategory.json";

export default function RadicalsDisplay({ keysRecord }) {
  return (
    <div className="flex flex-row justify-center mt-2 gap-4 select-none text-gray-500">
      {Object.entries(radicalsWithCategory).map(([key, value], index) => {
        return (
          <div
            className={`group flex flex-col relative text-2xl ${
              keysRecord.CurrentCategory < index + 1
                ? "text-gray-500"
                : "text-gray-700"
            }`}
            key={index}
          >
            <div
              className="flex flex-row rounded-md gap-2 p-1
              group-hover:bg-gray-200"
            >
              {Object.keys(value).map((radical, index) => {
                return <div key={index}>{radical}</div>;
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
