export default function IconWithText({ icon, text }) {
  return (
    <div
      className="
    flex items-center justify-center gap-2
    cursor-pointer select-none
    font-semibold text-gray-400
    group-hover:text-gray-500 group-hover:transition duration-500
    hover:bg-gray-200 hover:!text-blue-400 rounded-lg px-2 py-1"
    >
      <div className="transform translate-y-[2px]">{icon}</div>
      <span className="text-sm hidden md:flex">{text}</span>
    </div>
  );
}
