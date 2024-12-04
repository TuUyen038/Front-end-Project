import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UsernameInput from "./components/UsernameInput";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import { UserAPI } from "../../apis";
import { Alert } from "@mui/material";
import "./components/form.css";

function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [alert, setAlert] = useState({ severity: "", message: "" });
  const [timerCount, setTimerCount] = useState(60);
  const [disableResend, setDisableResend] = useState(true);

  //Hàm kiểm tra email hợp lệ hay không
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Hàm kiểm tra password không được chứa dấu cách và phải hơn 7 kí tự
  const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{7,}$/;
    return passwordRegex.test(password);
  };

  //Xử lí sự kiện khi nhấn nút Signup
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

    //ĐĂNG KÝ
    const res = await UserAPI.register(username, email, password);
    if (res.ok) {
      setAlert({
        severity: "success",
        message:
          "Registration successful! Please check your email to verify and convert to login page.",
      });
    } else {
      const err = await res.json();
      setAlert({
        severity: "error",
        message: err.message || "Failed to register!",
      });
    }
  };

  //Xử lí khi nhấn resend email
  const handleResendEmail = async () => {
    const res = await UserAPI.resendVerification(email);
    if (res.ok) {
      const data = await res.text();
      setAlert({
        severity: "info",
        message:
          data.message ||
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
        <h2 className="login-signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} noValidate>
          <UsernameInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            <button className="login-signup-button">Sign Up</button>
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
            className="form-footer-signup"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Link to="/login" className="footer-link">
              Already have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
