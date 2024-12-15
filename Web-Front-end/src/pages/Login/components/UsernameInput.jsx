import React from "react";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import "./input.css";

function UsernameInput({ value, onChange }) {
  return (
    <div className="input-container">
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-username">Username*</InputLabel>
        <OutlinedInput
          sx={{
            fontFamily: "Roboto Flex",
            fontSize: "1.8rem",
            padding: "0.8rem",
          }}
          type="text"
          id="username"
          label="username"
          value={value}
          onChange={onChange}
          autoComplete="off"
          required
        />
      </FormControl>
    </div>
  );
}

export default UsernameInput;
