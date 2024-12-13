/* eslint-disable react/prop-types */
import {
  addAdmin,
  DeleteAdmin,
  getDetailUser,
  getProject,
} from "../../services";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function Admin({ item, idAdmins, setIdAdmins,idUsers, setIdUsers  }) {
  const [detailAdmin, setDetailAdmin] = useState([]);
  const [detailUser, setDetailUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const currentUser = localStorage.getItem("id");
  const isAdmin = idAdmins.filter((id) => id === currentUser).length;

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
            <div className="main-content users" onClick={(e) => e.preventDefault()}>
              <h3>ALL USERS</h3>
              <p style={{ color: "#2D9596", marginTop: "10px" }}>Admin:</p>
              {detailAdmin.map((dt, index) => (
                <div className="row" key={index}>
                  <div className="group-name">
                    <p className="name">{dt.name}</p>
                    {(currentUser === dt.id) ? (<p style={{marginTop: "0px", color: "#999", fontSize: '1.3rem'}}>(You)</p>) : null}
                  </div>
                  {(isAdmin && (idAdmins.length !== 1)) ? (<Button onClick={() => handleDeleteAdmin(dt.id)}>
                    Delete Admin
                  </Button>) : null}
                </div>
              ))}
              <p style={{ color: "#2D9596", marginTop: "15px" }}>User:</p>
              {detailUser.map((dt, index) => (
                <div className="row" key={index}>
                  <div className="group-name">
                    <p className="name">{dt.name}</p>
                    {(currentUser === dt.id) ? (<p style={{marginTop: "0px", color: "#999", fontSize: '1.3rem'}}>(You)</p>) : null}
                  </div>
                  {isAdmin ? (<Button onClick={() => handleAddAdmin(dt.id)}>
                    Add Admin
                  </Button>) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
