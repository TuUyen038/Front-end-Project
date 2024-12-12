import { useState } from "react";
import "./UpdateF.css";
import { AddFriend, updateProject } from "../../services";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Update({ setLs, item, setShow }) {
  const [formData, setFormData] = useState({ ...item });
  const [showForm, setShowForm] = useState(false);
  const [emails, setEmails] = useState([]);

  const handleChangeE = (e, index) => {
    const newEmails = [...emails];
    newEmails[index] = e.target.value;
    setEmails(newEmails);
  };
  const handleAddE = () => {
    setEmails([...emails, ""]);
  };

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
    setEmails([]);
    setShowForm(false);
    setShow(false);
  };
  const handleUpdate = async () => {
    const updatedProject = await updateProject(formData);
    await Promise.all(
      emails.map((email) => {
        AddFriend(formData._id, email);
      })
    );

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
        className="btnn "
        onClick={handleOpen}
        variant="outlined"
      >
        Change
      </Button>

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
              <p className="addFriend">Invite your friends (via Email): </p>
              <div className="ListEmail">
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
              </div>
              <div className="row">
                <button className="BAdd" onClick={handleAddE}>
                  +
                </button>
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
