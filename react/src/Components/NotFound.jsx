import error404 from "../../../public/images/error404.jpeg";

export default function NotFound({ status = 404, message = "Not Found" }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center flex-col gap-4 z-[-1]">
      <img
        src={error404}
        alt="error 404"
        className="rounded-lg shadow-lg aspect-auto min-w-[40%] w-[400px]"
      />
      <div className="font-nunito text-5xl text-gray-700">
        {status} - {message}
      </div>
    </div>
  );
}
