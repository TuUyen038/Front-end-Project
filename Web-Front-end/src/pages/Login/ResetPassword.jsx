import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "./components/PasswordInput";
import "./components/form.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{7,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = password === confirmPassword;

    setPasswordError(!isPasswordValid);
    setConfirmPasswordError(!isConfirmPasswordValid); // Kiểm tra mật khẩu xác nhận khớp với mật khẩu trên

    if (isPasswordValid && isConfirmPasswordValid) {
      navigate("/login");
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-form">
        <h2 className="login-signup-title">New Password</h2>
        <p className="label-of-form">Please create a new password!</p>
        <form onSubmit={handleSubmit} noValidate>
          <p className="label-for-pass">New password</p>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />

          <p className="label-for-pass">Confirm password</p>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={false} // Không hiển thị lỗi của `PasswordInput`
          />
          {confirmPasswordError && (
            <p className="error-text">Password do not match</p>
          )}

          <div className="button-container">
            <button className="login-signup-button">Finish</button>
          </div>

          <Link to="/login" className="link-to-login">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
