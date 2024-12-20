/* eslint-disable react/prop-types */
import { useState } from "react";
import "./UpdateF.css";
import { getProject, updateProject } from "../../services";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function Update({ setLs, item, setShow, idAdmins}) {
  const [formData, setFormData] = useState({ ...item });
  const [showForm, setShowForm] = useState(false);
  const currentUser = localStorage.getItem("id");
  const isAdmin = idAdmins.filter((id) => id === currentUser).length;

  const handleOpen = (e) => {
    e.preventDefault();
    setShowForm(true);
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
    setShowForm(false);
    setShow(false);
  };
  const handleUpdate = async () => {
    const updatedProject = await updateProject(formData);
    if(!updatedProject) {
      toast.error("Title must contain at least 3 characters and Description cannot be empty!")
      return
    }
    await getProject(item._id);
    setLs((prevProjects) =>
      prevProjects.map((p) =>
        p._id === updatedProject._id ? updatedProject : p
      )
    );
  };

  return (
    <>
      {isAdmin ? (
        <Button
          sx={{
            border: "none",
            fontSize: "1.3rem",
            borderBottom: "1px solid currentColor",
            borderRadius: "0px",
          }}
          className="btnn "
          onClick={handleOpen}
          variant="outlined"
        >
          Change
        </Button>
      ) : null}

      {showForm && (
        <div className="form">
          <div
            className="blur"
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
          ></div>

          <div className="add">
            <div className="main-content" onClick={(e) => e.preventDefault()}>
              <div className="row">
                <p>Name:</p>
                <Input
                  defaultValue={formData.title}
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  sx={{ borderBottom: "1px solid #999", color: "#111" }}
                />
              </div>
              <div className="row">
                <p>Description:</p>
                <Input
                  defaultValue={formData.description}
                  onChange={handleInputChange}
                  type="text"
                  name="description"
                  sx={{ borderBottom: "1px solid #999", color: "#111" }}
                />
              </div>
              <Button
                sx={{
                  marginTop: "30px",
                  fontSize: "1.5rem",
                }}
                onClick={handleSubmitUpdate}
                variant="outlined"
              >
                update
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
