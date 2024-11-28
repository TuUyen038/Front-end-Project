/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { addProject } from "../services";
import "./AddF.css";
import Input from "@mui/material/Input";
import { Button, TextField } from "@mui/material";

export default function Add({ setLs, open, setOpen }) {
  const refInput = useRef({});
  const [emails, setEmails] = useState([""]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChangeE = (e, index) => {
    const newEmails = [...emails];
    newEmails[index] = e.target.value;
    setEmails(newEmails);
  };
  const handleAddEmail = () => {
    setEmails([...emails, ""]);
    console.log(emails);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAdd = () => {
    addProject(formData).then((data) => {
      if (data) {
        setLs((prevProjects) => [...prevProjects, formData]);
      }
    });
  };
  const handClickAdd = () => {
    handleAdd();
    setOpen(false);
  };
  return (
    <div>
      <div className="AddF">
        <button onClick={() => setOpen(false)} className="blur"></button>
        <div className="mainContent">
          <div className="row">
            <Input
              onChange={handleChange}
              type="text"
              name="title"
              value={formData.title}
              placeholder="Project name"
              sx={{ marginBottom: "15px" }}
            />
          </div>
          <div className="row">
            <Input
              onChange={handleChange}
              type="text"
              name="description"
              value={formData.description}
              placeholder="Description"
              sx={{ marginBottom: "15px" }}
            />
          </div>

          <p>Add your friend (by Email): </p>
          {emails.map((email, index) => (
            <div className="rowOfEmail" key={index}>
              <Input
                className="input"
                onChange={(e) => handleChangeE(e, index)}
                type="text"
                name={`email-${index}`}
                value={email}
                placeholder="Email"
                sx={{ marginBottom: "10px" }}
              />
            </div>
          ))}
          <div className="row">
            <button onClick={handleAddEmail}>+</button>
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
