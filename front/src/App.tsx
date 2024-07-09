import React from "react";

import Register from "./Components/Register";
import Main from "./Components/Main";
import Login from "./Components/Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import * as S from "./AppStyles";
import setupAxiosInterceptors from "./setupAxiosInterceptors";
import ChangePassword from "./Components/ChangePassword";
import ResetPassword from "./Components/ResetPasword";

import NotesFetch from "./Components/NotesFetch";

function App() {
  const [session, setSession] = useState(null);

  const history = useNavigate();
  function handleLoginSuccess(user: any) {
    setSession(user);
  }

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setSession(null);
    history("/logowanie");
  };

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main session={session} />} />
        <Route path="/rejestracja" element={<Register />} />
        <Route
          path="/logowanie"
          element={
            <Login onLoginSuccess={(user) => handleLoginSuccess(user)} />
          }
        />
        <Route
          path="/notes"
          element={
            <>
              <NotesFetch />

              <S.Div>
                <Link to={"/change-password"}>Zmień Hasło</Link>
                <Link to={"/"}>Cofnij</Link>
                <S.Button onClick={logOut}>Wyloguj</S.Button>
              </S.Div>
            </>
          }
        />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
