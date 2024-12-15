/* eslint-disable react/prop-types */
import React from "react";
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
  user: {},
};

// charAt(index): trả về kí tự tại chỉ số index
// charCodeAt(index): trả về mã Unicode
// Hàm ánh xạ chữ cái đầu tiên sang ảnh
const getAvatar = (username) => {
  const firstLetter = username.charAt(0).toUpperCase();

  if (
    "A".charCodeAt(0) <= firstLetter.charCodeAt(0) &&
    firstLetter.charCodeAt(0) <= "E".charCodeAt(0)
  ) {
    return "/images/alex.jpg";
  } else if (
    "F".charCodeAt(0) <= firstLetter.charCodeAt(0) &&
    firstLetter.charCodeAt(0) <= "J".charCodeAt(0)
  ) {
    return "/images/anna.jpg";
  } else if (
    "K".charCodeAt(0) <= firstLetter.charCodeAt(0) &&
    firstLetter.charCodeAt(0) <= "O".charCodeAt(0)
  ) {
    return "/images/avt.jpg";
  } else if (
    "P".charCodeAt(0) <= firstLetter.charCodeAt(0) &&
    firstLetter.charCodeAt(0) <= "T".charCodeAt(0)
  ) {
    return "/images/katty.jpg";
  } else if (
    "U".charCodeAt(0) <= firstLetter.charCodeAt(0) &&
    firstLetter.charCodeAt(0) <= "Y".charCodeAt(0)
  ) {
    return "/images/thomas.jpg";
  } else {
    return "/images/z_avt.jpg";
  }
};

function Header({ checked, onChange }) {
  const [localStorageAuth, setLocalStorageAuth] = React.useState(updatedInfo);

  const avatar = getAvatar(localStorage.getItem("name"));
  localStorage.setItem("avatar", avatar);

  React.useEffect(() => {
    const updatedInfo = {
      user: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        image: avatar,
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
        localStorage.removeItem("avatar");
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
          <p
            style={{
              fontWeight: "900",
              letterSpacing: "1.6px",
              fontSize: "1.7rem",
              fontFamily: "Agu Display, serif",
            }}
          >
            KanBan
          </p>
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
                <Account
                  slotProps={{
                    popoverContent: {
                      sx: {
                        "& .MuiTypography-root": {
                          fontSize: "1.1rem",
                        },
                      },
                    },
                  }}
                />
              </SessionContext.Provider>
            </AuthenticationContext.Provider>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
