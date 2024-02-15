import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const AuthenticationButton = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  return (
    <button className="LoginButton" onClick={isLoggedIn ? logout : login}>
      {isLoggedIn ? "ログアウト" : "ログイン"}
    </button>
  );
};

export default AuthenticationButton;
