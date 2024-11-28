import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import "./input.css";

function PasswordInput({ value, onChange, error }) {
  const [showPassword, setShowPassword] = React.useState(false);

  // Hàm chuyển đổi giữa chế độ ẩn/hiện mật khẩu
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-container">
      <FormControl variant="outlined" fullWidth error={error}>
        <InputLabel htmlFor="outlined-password">Password*</InputLabel>
        <OutlinedInput
          sx={{
            fontFamily: "Roboto Flex",
            fontSize: "1.8rem",
          }}
          type={showPassword ? "text" : "password"}
          id="password"
          value={value}
          onChange={onChange}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="large" />
                ) : (
                  <Visibility fontSize="large" />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {error && (
          <FormHelperText sx={{ fontSize: "1.3rem" }}>
            - Password must have at least 8 characters.
            <br />
            - Password without spaces or accent marks.
            <br />
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default PasswordInput;
