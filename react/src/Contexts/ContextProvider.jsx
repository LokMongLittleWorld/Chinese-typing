import { createContext, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthenticationModel from "../Components/AuthenticationModel.jsx";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  setShowAuthenticationModel: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [showAuthenticationModel, setShowAuthenticationModel] = useState(false);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
  return (
    <StateContext.Provider
      value={{ user, token, setUser, setToken, setShowAuthenticationModel }}
    >
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "#f9fafb",
            color: "#374151",
          },
        }}
      />
      <AuthenticationModel
        showModal={showAuthenticationModel}
        setShowModal={setShowAuthenticationModel}
      />
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
