import { Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { isStringValid } from "../common/function.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function DefaultLayout() {
  const { token, setUser } = useStateContext();

  useEffect(() => {
    if (isStringValid(token)) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <div id="defaultLayout" className="w-full py-6">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
