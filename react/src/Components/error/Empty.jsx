import empty from "../../../../public/images/empty.jpeg";

export default function Empty({ message = "Not Found" }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center flex-col gap-4 z-[-1] select-none">
      <img
        src={empty}
        alt="error 404"
        className="rounded-lg shadow-lg aspect-auto min-w-[40%] w-[400px]"
      />
      <div className="font-nunito text-2xl text-gray-700">{message}</div>
    </div>
  );
}
