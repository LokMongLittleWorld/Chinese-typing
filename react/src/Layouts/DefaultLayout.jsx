import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function DefaultLayout() {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const HandleLogout = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div>DefaultLayout HI: {user}</div>
      <Outlet />
    </div>
  );
}
