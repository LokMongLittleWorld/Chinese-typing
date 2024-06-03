export default function LoginButton({ handleOnClick }) {
  return (
    <button
      onClick={handleOnClick}
      type="button"
      className="group text-white bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-transparent focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center"
    >
      <div className="transform group-hover:-translate-y-[1px] transition duration-300">
        登入
      </div>
    </button>
  );
}
