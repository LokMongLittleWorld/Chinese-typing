export default function PracticeCategory({
  category,
  currentCategory,
  setCurrentCategory,
}) {
  return (
    <div className="flex flex-row items-center bg-gray-200 gap-4 py-1 px-2 rounded-lg">
      {category.map((item) => {
        return (
          <div
            onClick={() => setCurrentCategory(item)}
            className={`text-2xl cursor-pointer ${
              currentCategory === item ? "text-blue-500" : "text-gray-700"
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
