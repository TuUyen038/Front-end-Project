import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "./components/form.css";
import { UserAPI } from "../../apis";

function VerifyAccount() {
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);
  const [timerCount, setTimerCount] = useState(0);
  const [disableResend, setDisableResend] = useState(false);
  const [alert, setAlert] = useState({ severity: "", message: "" });

  //Tự động gọi để chuyển đến input kế tiếp
  const handleChange = (index, e) => {
    const updatedOtp = [...otpInput];
    updatedOtp[index] = e.target.value;

    if (e.target.value && index < otpInput.length - 1) {
      // Nếu đã có giá trị và index chưa phải là phần tử cuối cùng, tự động di chuyển đến input tiếp theo
      setOtpInput(updatedOtp);
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput.focus();
    } else {
      setOtpInput(updatedOtp);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = otpInput.join("");

    const res = await UserAPI.verificationOTP(otp);
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("userId", data.userId);
      setAlert({
        severity: "success",
        message:
          data.message ||
          "OTP verified successfully! Please change your password!",
      });
      setTimeout(() => navigate("/reset_password"), 2500);
    } else {
      const err = res.json();
      setAlert({
        severity: "error",
        message:
          err.message || "The OTP entered is incorrect. Please try again!",
      });
      setOtpInput(["", "", "", "", "", ""]);
    }
  };

  // Gửi lại OTP và làm rỗng input, chỉnh thời gian,...
  const handleResendOtp = async () => {
    setOtpInput(["", "", "", "", "", ""]);
    setTimerCount(60);
    setDisableResend(true);

    const res = await UserAPI.forgotPassword(localStorage.getItem("userEmail"));
    if (res.ok) {
      const responce = await res.text();
      setAlert({
        severity: "info",
        message: responce || "Please check your email!",
      });
      localStorage.removeItem("userEmail");
      setTimeout(() => navigate("/verify_account"), 2000);
    } else {
      const err = await res.json();
      setAlert({
        severity: "error",
        message: err.message || "Please try again!",
      });
    }
  };

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
        <h2 className="login-signup-title">Email Verification</h2>
        <p className="label-of-form">We have sent a code to your email!</p>
        <form onSubmit={handleVerify}>
          <div className="otp-input-container">
            {otpInput.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(index, e)}
                className="otp-input"
              />
            ))}
          </div>

          <div className="button-container">
            <button className="login-signup-button">Verify Account</button>
          </div>

          <div className="resend-container">
            <span>Didn't receive the code?</span>
            <span
              onClick={!disableResend ? handleResendOtp : undefined}
              className="resend-content"
              disabled={disableResend}
            >
              {disableResend ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </span>
          </div>

          <Link to="/login" className="link-to-login">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default VerifyAccount;
