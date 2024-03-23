export default function Record({ speed, accuracy }) {
  return (
    <div className="flex flex-row items-center bg-gray-200 gap-4 py-1 px-2 rounded-lg select-none">
      <div className="flex flex-row">
        <div className="text-2xl text-gray-700">速度：</div>
        <div className="text-2xl text-emerald-500">{speed}</div>
        <div className="text-2xl text-emerald-500">字/分鐘</div>
      </div>
      <div className="flex flex-row">
        <div className="text-2xl">準繩度：</div>
        <div className="text-2xl text-emerald-500">{accuracy * 100}%</div>
      </div>
    </div>
  );
}
