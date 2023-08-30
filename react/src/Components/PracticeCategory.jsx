export default function PracticeCategory({ category }) {
  return (
    <div className="flex flex-row items-center bg-gray-200 gap-4 py-1 px-2 rounded-lg">
      {category.map((item) => {
        return (
          <div className="text-2xl text-gray-700" key={item}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
