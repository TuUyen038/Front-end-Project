import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./components/form.css";
import EmailInput from "./components/EmailInput";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailError(true);
      return;
    }

    navigate("/verify_account");
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-form">
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
