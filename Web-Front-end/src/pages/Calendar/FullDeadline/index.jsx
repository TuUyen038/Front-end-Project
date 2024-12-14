/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FullDeadline.css";
import Checkbox from "@mui/material/Checkbox";
import { updateDeadline } from "../../Workspace/services";
export default function FullDeadline({ title, time, initialStatus, id, dark }) {
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
      case "late": return {  background: "hsla(0, 95.00%, 76.50%, 0.42)" }
      case "on_time" : return { background:"hsla(163, 55.30%, 70.20%, 0.29)" }
      default: return {}
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
          <p >{title}</p>
        </div>
        <div style={{color: dark? "#222" : "#999"}} className="time">
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}
