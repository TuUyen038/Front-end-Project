import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./components/form.css";
import EmailInput from "./components/EmailInput";
import { UserAPI } from "../../apis";
import { Alert } from "@mui/material";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [alert, setAlert] = useState({ severity: "", message: "" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailError(true);
      return;
    }

    setAlert({ severity: "info", message: "Please wait a minute!" });

    const res = await UserAPI.forgotPassword(email);
    if (res.ok) {
      localStorage.setItem("userEmail", email);
      const responce = await res.text();
      setAlert({
        severity: "info",
        message: responce || "Please check your email!",
      });
      setTimeout(() => navigate("/verify_account"), 2000);
    } else {
      const err = await res.json();
      setAlert({
        severity: "error",
        message: err.msg || "Please try again!",
      });
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
        <h2 className="login-signup-title">Forgot Password</h2>
        <p className="label-of-form">Please enter your email!</p>
        <form onSubmit={handleContinue} noValidate>
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />

          <div className="button-container">
            <button className="login-signup-button">Continue</button>
          </div>

          <Link to="/login" className="link-to-login">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
