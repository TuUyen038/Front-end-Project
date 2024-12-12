import {
  addAdmin,
  DeleteAdmin,
  getDetailUser,
  getProject,
} from "../../services";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function Admin({ item }) {
  const [idUsers, setIdUsers] = useState(item.userOrderIds);
  const [idAdmins, setIdAdmins] = useState(item.adminOrderIds);
  const [detailAd, setDetailAd] = useState([]);
  const [detailUser, setDetailUser] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
        setDetailAd(adDetails);
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
        Admin
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
            <div className="main-content" onClick={(e) => e.preventDefault()}>
              <p style={{ color: "#2D9596", marginTop: "10px" }}>Admin:</p>
              {detailAd.map((dt, index) => (
                <div className="row" key={index}>
                  <p className="name">{dt.name}</p>
                  <Button onClick={() => handleDeleteAdmin(dt.id)}>
                    Delete Admin
                  </Button>
                </div>
              ))}
              <p style={{ color: "#2D9596", marginTop: "10px" }}>User:</p>
              {detailUser.map((dt, index) => (
                <div className="row" key={index}>
                  <p className="name">{dt.name}</p>
                  <Button onClick={() => handleAddAdmin(dt.id)}>
                    Add Admin
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
