/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { addProject } from "../services";
import "./AddF.css";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

export default function Add({ setLs, open, setOpen }) {
  var dark = localStorage.getItem("darkMode")
  const refInput = useRef({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAdd = async () => {
    const newProject = await addProject(formData);
    if (newProject) {
      setLs((prevProjects) => [...prevProjects, newProject]);
    }
  };
  const handClickAdd = () => {
    handleAdd();
    setFormData({
      title: "",
      description: "",
    });
    setOpen(false);
  };
  return (
    <div>
      <div className="AddF">
        <button onClick={() => setOpen(false)} className="blur"></button>
        <div className="mainContent" style={{background: dark? "black":"#fff"}}>
          <div className="row">
            <Input
              onChange={handleChange}
              type="text"
              name="title"
              value={formData.title}
              placeholder="Project name"
              sx={{ marginBottom: "15px"}}
            />
          </div>
          <div className="row">
            <Input
              onChange={handleChange}
              type="text"
              name="description"
              value={formData.description}
              placeholder="Description"
              sx={{ marginBottom: "15px"}}
            />
          </div>

          <Button
            sx={{
              fontSize: "1.5rem",
              marginTop: "27px",
              marginLeft: "-1px",
            }}
            onClick={handClickAdd}
            variant="outlined"
          >
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
}
