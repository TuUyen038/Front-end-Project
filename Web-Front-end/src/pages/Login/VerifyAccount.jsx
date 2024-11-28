import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "./components/form.css";

function VerifyAccount() {
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState(["", "", "", ""]);
  const [timerCount, setTimerCount] = useState(60);
  const [disableResend, setDisableResend] = useState(true);
  const [otp, setOtp] = useState(0);
  const [alert, setAlert] = useState({ severity: "", message: "" });

  useEffect(() => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(generatedOtp);
    console.log(generatedOtp);
  }, []);

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

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = parseInt(otpInput.join(""));

    if (enteredOtp === otp) {
      setAlert({ severity: "success", message: "OTP verified successfully!" });
      setTimeout(() => navigate("/reset_password"), 2000); //chuyển đến trang reset_password trong 2 giây
    } else {
      setAlert({
        severity: "error",
        message: "The OTP entered is incorrect. Please try again!",
      });
      setOtpInput(["", "", "", ""]);
    }
  };

  // Gửi lại OTP
  const handleResendOtp = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000); // Tạo OTP mới khi gửi lại
    setOtp(generatedOtp);
    setOtpInput(["", "", "", ""]);
    console.log(generatedOtp);
    setTimerCount(60);
    setDisableResend(true);
    setAlert({
      severity: "info",
      message: "A new OTP has been sent to your email!",
    });
  };

  // Timer countdown
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
