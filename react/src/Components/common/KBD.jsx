export default function KBD({ keyName }) {
  return (
    <kbd
      className="
  mx-2 px-3 py-1 text-base font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg
  shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] hover:shadow-none transition duration-200 ease-in-out
  transform hover:translate-y-[2px]
  cursor-pointer
  "
    >
      {keyName}
    </kbd>
  );
}
