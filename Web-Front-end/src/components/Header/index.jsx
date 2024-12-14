/* eslint-disable react/prop-types */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import Setting from "../../pages/Setting/Setting";
import { Button } from "@mui/material";
import { Account } from "@toolpad/core/Account";
import {
  AuthenticationContext,
  SessionContext,
} from "@toolpad/core/AppProvider";

const updatedInfo = {
  user: {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  },
};

function Header({ checked, onChange }) {
  const [localStorageAuth, setLocalStorageAuth] = React.useState(updatedInfo);

  React.useEffect(() => {
    const updatedInfo = {
      user: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      },
    };
    setLocalStorageAuth(updatedInfo);
  }, []);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setLocalStorageAuth(updatedInfo);
      },

      signOut: () => {
        setLocalStorageAuth(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("userEmail");
        localStorage.setItem("isLoggedIn", "false");
        window.location.reload(); //load lại trang
      },
    };
  }, []);

  return (
    <>
      <header className={style.Header}>
        <div className={style.Logo}>
          <p>Logo</p>
        </div>
        <nav className={style.Navigation}>
          <ul>
            <li>
              <Link to="/">
                <p>WORKSPACE</p>
              </Link>
            </li>
            <li>
              <Link to="/calendar">
                <p>CALENDAR</p>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={style.Tools}>
          <div className={style.Setting}>
            <Setting checked={checked} onChange={onChange} />
          </div>
          
          <div className={style.Account}>
            
            <AuthenticationContext.Provider value={authentication}>
              <SessionContext.Provider value={localStorageAuth}>
                <Account />
              </SessionContext.Provider>
            </AuthenticationContext.Provider>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
