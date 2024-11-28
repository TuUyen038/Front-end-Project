import { useState } from "react";
import "./UpdateF.css";
import { updateProject } from "../services";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Update({ setLs, item }) {
  const [formData, setFormData] = useState({ ...item });
  const [showForm, setShowForm] = useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setShowForm(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setShowForm(false);
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };
  const handleUpdate = async () => {
    const updatedProject = await updateProject(formData);
    setLs((prevProjects) =>
      prevProjects.map((p) =>
        p._id === updatedProject._id ? updatedProject : p
      )
    );
  };

  return (
    <>
      <Button
        sx={{
          border: "none",
          fontSize: "1.3rem",
          borderBottom: "1px solid currentColor",
          borderRadius: "0px",
        }}
        className="btnn change"
        onClick={handleOpen}
        variant="outlined"
      >
        Change
      </Button>
      {showForm && (
        <div className="form">
          <div className="blur"></div>

          <div className="add">
            <div className="main-content" onClick={(e) => e.preventDefault()}>
              <button className="close" onClick={handleClose}>
                x
              </button>
              <div className="row">
                <p>Name:</p>
                <Input
                  defaultValue={formData.title}
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                />
              </div>
              <div className="row">
                <p>Description:</p>
                <Input
                  defaultValue={formData.description}
                  onChange={handleInputChange}
                  type="text"
                  name="description"
                />
              </div>
              <Button
                sx={{
                  fontSize: "1.5rem",
                  marginTop: "27px",
                  marginLeft: "-1px",
                }}
                onClick={handleSubmitUpdate}
                variant="outlined"
              >
                Change
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
