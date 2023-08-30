import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import Record from "../Components/Record.jsx";
import PracticeCategory from "../Components/PracticeCategory.jsx";

//"中文速打", "倉頡練習", "粵拼練習"
export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();
  const header = {
    speedTyping: "中文速打",
    cangjie: "倉頡練習",
    jyutping: "粵拼練習",
  };
  const category = ["字根訓練", "字形訓練", "單字訓練"];

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div id="defaultLayout">
      {/*<aside>*/}
      {/*  <Link to="/dashboard">Dashboard</Link>*/}
      {/*  <Link to="/users">Users</Link>*/}
      {/*</aside>*/}
      <div className="w-full p-6">
        <header className="flex flex-col justify-center items-center mt-2">
          <div className="flex flex-row gap-10 text-4xl font-bold">
            {Object.entries(header).map(([key, value]) => {
              return (
                <Link
                  key={key}
                  to={"/" + key}
                  className="hover:text-blue-500 hover:-translate-y-0.5 transition-all duration-50"
                >
                  {value}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex flex-row items-center gap-4">
            <Record speed={70} accuracy={0.95} />
            <PracticeCategory category={category} />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
