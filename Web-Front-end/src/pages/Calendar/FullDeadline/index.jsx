/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FullDeadline.css";
import Checkbox from "@mui/material/Checkbox";

export default function FullDeadline({ title, time }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="item">
      <Checkbox
        checked={isChecked}
        onChange={handleChange}
        {...label}
        sx={{ fontSize: "2rem" }}
      />
      <div className="mainD">
        <div className="name">
          <p>{title}</p>
        </div>
        <div className="time">
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}
