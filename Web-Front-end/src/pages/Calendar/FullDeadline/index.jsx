/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FullDeadline.css";
import Checkbox from "@mui/material/Checkbox";
import { updateDeadline } from "../../Workspace/services";
export default function FullDeadline({ title, time, initialStatus, id }) {
  const [status, setStatus] = useState(initialStatus)
  const [isChecked, setIsChecked] = useState(status === "on_time");

  const handleChange = async (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    const newStatus = checked ? "on_time" : "not_done"; 
    setStatus(newStatus);

    const result = await updateDeadline(id, newStatus);
    if (!result) {
      console.error("Failed to update deadline");
    }
  };

  const changStyle = (status) => {
    switch (status) {
      case "late": return { border: "1px solid red" }
      case "on_time" : return {border: "1px solid green" }
      default: return {border: "none"}
    }
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="item">
      <Checkbox
      disabled={status === "late"}
        checked={isChecked}
        onChange={handleChange}
        {...label}
        sx={{ fontSize: "2rem" }}
      />
      <div className="mainD" style={changStyle(status)}>
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
