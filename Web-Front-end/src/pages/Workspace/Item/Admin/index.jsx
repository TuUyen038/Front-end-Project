/* eslint-disable react/prop-types */
import {
  addAdmin,
  AddFriend,
  DeleteAdmin,
  getDetailUser,
  getProject,
  removeUser,
} from "../../services";
import { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { toast } from "react-toastify";

export default function Admin({
  item,
  idAdmins,
  setIdAdmins,
  idUsers,
  setIdUsers,
}) {
  const [detailAdmin, setDetailAdmin] = useState([]);
  const [detailUser, setDetailUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const currentUser = localStorage.getItem("id");
  const isAdmin = idAdmins.filter((id) => id === currentUser).length;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const filteredIds = idUsers.filter((id) => !idAdmins.includes(id));
        const userDetails = await Promise.all(
          filteredIds.map((id) => getDetailUser(id))
        );
        const adDetails = await Promise.all(
          idAdmins.map((id) => getDetailUser(id))
        );
        setDetailUser(userDetails);
        setDetailAdmin(adDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchDetails();
  }, [idAdmins, idUsers]);

  const handleUpdate = async () => {
    
      const kq=  AddFriend(formData._id, email);
 
    if (!kq) return;
    await getProject(item._id);
    setIdUsers(item.userOrderIds);
  };
  const handleChangeE = (e) => {
    const newEmails = e.target.value
  
    setEmail(newEmails);

    // Kiểm tra email hợp lệ
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    if (!isValidEmail) {
      setError(`Email không hợp lệ`);
    }
  };
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    
    if(!email.trim()){
      toast.error("Email cannot be blank!")
      return
    }
    if(!error.trim()){
      toast.error(error)
      return
    }
    handleUpdate(email);
    setEmail([]);
  };
  const handleOpen = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleAddAdmin = async (idAd) => {
    try {
      await addAdmin(item._id, idAd);
      const updatedProject = await getProject(item._id);
      setIdAdmins(updatedProject.adminOrderIds);
      setIdUsers(updatedProject.userOrderIds);
    } catch (error) {
      console.log("Error adding admin:", error);
    }
  };
  const handleRemoveUser = async (idUser) => {
    alert("Do you want to remove this user from the project?");
    const kq = await removeUser(item._id, idUser);
    if (!kq) return;
    const updatedProject = await getProject(item._id);
    setIdAdmins(updatedProject.adminOrderIds);
    setIdUsers(updatedProject.userOrderIds);
  };
  const handleDeleteAdmin = async (idAd) => {
    try {
      await DeleteAdmin(item._id, idAd);
      const updatedProject = await getProject(item._id);
      setIdAdmins(updatedProject.adminOrderIds);
      setIdUsers(updatedProject.userOrderIds);
    } catch (error) {
      console.log("Error delete admin:", error);
    }
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
        className="btnn"
        onClick={handleOpen}
        variant="outlined"
      >
        users
      </Button>

      {showForm && (
        <div className="form admin">
          <div
            className="blur"
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
          ></div>
          <div className="add">
            <div
              className="main-content users"
              onClick={(e) => e.preventDefault()}
            >
              <h3>ALL USERS</h3>
              <div
                style={{
                  borderBottom: "1px solid #9999",
                  paddingBottom: "10px",
                }}
              >
                <p style={{ color: "#2D9596", marginTop: "10px" }}>Admin:</p>
                {detailAdmin.map((dt, index) => (
                  <div className="row" key={index}>
                    <div className="group-name">
                      <p className="name">{dt.name}</p>
                      {currentUser === dt.id ? (
                        <p
                          style={{
                            marginTop: "0px",
                            color: "#999",
                            fontSize: "1.3rem",
                          }}
                        >
                          (You)
                        </p>
                      ) : null}
                    </div>
                    {isAdmin && idAdmins.length !== 1 ? (
                      <Button onClick={() => handleDeleteAdmin(dt.id)}>
                        Delete Admin
                      </Button>
                    ) : null}
                  </div>
                ))}
                <p style={{ color: "#2D9596", marginTop: "15px" }}>User:</p>
                {detailUser.map((dt, index) => (
                  <div className="row" key={index}>
                    <div className="group-name">
                      <p className="name">{dt.name}</p>
                      {currentUser === dt.id ? (
                        <p
                          style={{
                            marginTop: "0px",
                            color: "#999",
                            fontSize: "1.3rem",
                          }}
                        >
                          (You)
                        </p>
                      ) : null}
                    </div>
                    {isAdmin ? (
                      <div className="grp-btn">
                        <Button onClick={() => handleAddAdmin(dt.id)}>
                          Add Admin
                        </Button>
                        <Button onClick={() => handleRemoveUser(dt.id)}>
                          Remove
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <p className="addFriend">Invite your friends (via Email): </p>
              <div className="ListEmail">
                
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="rowOfEmail"
                   
                  >
                    <Input
                      className="input"
                      onChange={(e) => handleChangeE(e)}
                      type="email"
                      name={`email`}
                      value={email}
                      placeholder="Email"
                      sx={{ marginBottom: "10px", fontSize: "1rem" }}
                    />
                    <Button
                      sx={{
                        marginLeft: "30px",
                      }}
                      onClick={handleSubmitUpdate}
                      variant="outlined"
                    >
                      invite
                    </Button>
                  </div>
                
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}
