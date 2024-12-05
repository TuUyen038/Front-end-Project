import React, { useState, useEffect } from "react";
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
  const [timerCount, setTimerCount] = useState(0);
  const [disableResend, setDisableResend] = useState(false);

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
      //console.log("token: ", data.token)
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("isLoggedIn", btoa("true"));
      onLoginSuccess();
      navigate("/");
    } else {
      const err = await res.json();
      setAlert({
        severity: "error",
        message: err.message || "Failed to login!",
      });
    }
  };

  //Xử lí khi nhấn resend email
  const handleResendEmail = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailError(true);
      return;
    }

    const res = await UserAPI.resendVerification(email);
    if (res.ok) {
      const responce = await res.text();
      setAlert({
        severity: "info",
        message:
          responce ||
          "A new OTP has been sent to your email. Please check and convert to login page!",
      });
      setTimerCount(60);
      setDisableResend(true);
    } else {
      const err = await res.json();
      setAlert({
        severity: "error",
        message: err.message || "Failed send to your email!",
      });
      setTimerCount(60);
      setDisableResend(true);
    }
  };

  // Đếm ngược thời gian
  useEffect(() => {
    if (timerCount > 0) {
      const interval = setInterval(() => {
        setTimerCount((prev) => {
          if (prev === 1) setDisableResend(false);
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerCount]);

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

          <div className="resend-container">
            <span>Didn't receive the email?</span>
            <span
              onClick={!disableResend ? handleResendEmail : undefined}
              className="resend-content"
              disabled={disableResend}
            >
              {disableResend
                ? `Resend email in ${timerCount}s`
                : "Resend email"}
            </span>
          </div>

          <div
            className="form-footer-login"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.2rem",
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
