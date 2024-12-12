import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "./components/PasswordInput";
import { UserAPI } from "../../apis";
import { Alert } from "@mui/material";
import "./components/form.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [alert, setAlert] = useState({ severity: "", message: "" });

  const validatePassword = (newPassword) => {
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{7,}$/;
    return passwordRegex.test(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(newPassword);
    const isConfirmPasswordValid = newPassword === confirmPassword;

    setPasswordError(!isPasswordValid);
    setConfirmPasswordError(!isConfirmPasswordValid); // Kiểm tra mật khẩu xác nhận khớp với mật khẩu trên

    if (isPasswordValid && isConfirmPasswordValid) {
      const res = await UserAPI.updateNewPassword(
        localStorage.getItem("userId"),
        newPassword
      );

      if (res.ok) {
        const responce = await res.text();
        setAlert({
          severity: "success",
          message: responce || "Success! Please log in!",
        });
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const err = await res.text();
        setAlert({
          severity: "error",
          message: err || "Failed to update! Please try again!",
        });
      }
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
        <h2 className="login-signup-title">New Password</h2>
        <p className="label-of-form">Please create a new password!</p>
        <form onSubmit={handleSubmit} noValidate>
          <p className="label-for-pass">New password</p>
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={passwordError}
          />

          <p className="label-for-pass">Confirm password</p>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={false} // Không hiển thị lỗi của PasswordInput
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
