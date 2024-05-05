export default function PracticeCategory({
  category,
  currentCategoryIndex,
  handleCategoryChange,
}) {
  return (
    <div className="flex flex-row items-center bg-gray-200 gap-4 py-1 px-2 rounded-lg select-none">
      {category.map((item, index) => {
        return (
          <div
            onClick={() => handleCategoryChange(index)}
            className={`text-2xl cursor-pointer ${
              category[currentCategoryIndex] === item
                ? "text-blue-500"
                : "text-gray-700"
            }`}
            key={item}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
