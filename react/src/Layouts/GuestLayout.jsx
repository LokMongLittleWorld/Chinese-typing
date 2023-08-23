import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function GuestLayout() {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>Guess layout</div>
      <Outlet />
    </div>
  );
}
