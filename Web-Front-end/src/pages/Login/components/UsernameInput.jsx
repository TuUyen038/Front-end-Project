import React from "react";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import "./input.css";

function UsernameInput({ value, onChange }) {
  return (
    <div className="input-container">
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-username">Username</InputLabel>
        <OutlinedInput
          sx={{
            fontFamily: "Roboto Flex",
            fontSize: "1.8rem",
          }}
          type="username"
          id="username"
          label="username"
          title="username"
          placeholder="Enter your username"
          value={value}
          onChange={onChange}
          required
        />
      </FormControl>
    </div>
  );
}

export default UsernameInput;
