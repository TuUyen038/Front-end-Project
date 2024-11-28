import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import { UserAPI } from "../../apis";
import { Alert } from "@mui/material";
import "./components/form.css";

function LoginForm({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [alert, setAlert] = useState({ severity: "", message: "" });

  //Hàm kiểm tra email phải bao gồm @ và dấu .
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Kiểm tra password
  const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{7,}$/;
    return passwordRegex.test(password);
  };

  //Xử lí sự kiện khi nhấn nút Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailError(true);
      return;
    }

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      setPasswordError(true);
      return;
    }

    //ĐĂNG NHẬP
    const res = await UserAPI.login(email, password);
    if (res.ok) {
      //Đăng nhập thành công
      const userData = await res.json();
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess();
      navigate("/");
    } else {
      setAlert({ severity: "error", message: "Failed to login!" });
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-form">
        {alert.message && (
          <Alert severity={alert.severity} style={{ fontSize: "1.4rem" }}>
            {alert.message}
          </Alert>
        )}
        <h2 className="login-signup-title">Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />

          <div className="button-container">
            <button className="login-signup-button">Login</button>
          </div>

          <div
            className="form-footer-login"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.625rem",
            }}
          >
            <Link to="/signup" className="footer-link">
              Create an account
            </Link>

            <Link to="/forgot_password" className="footer-link">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
