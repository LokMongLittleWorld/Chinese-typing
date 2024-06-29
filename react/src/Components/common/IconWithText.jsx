export default function IconWithText({ icon, text }) {
  return (
    <div
      className="
    flex items-center justify-center gap-2
    cursor-pointer select-none
    font-semibold text-gray-700/70 hover:text-blue-500
    hover:bg-gray-200 rounded-lg px-2 py-1"
    >
      <div className="transform translate-y-[2px]">{icon}</div>
      <span className="text-xl hidden md:flex">{text}</span>
    </div>
  );
}
