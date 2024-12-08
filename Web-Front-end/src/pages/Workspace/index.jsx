/* eslint-disable react/prop-types */
import ListItem from "./ListItem";
import style from "./Workspace.module.css";
import ListDeadline from "./ListDeadline";
import {
  getProject,
  getListProject,
  getListDeadline,
  getDeadline,
} from "./services";
import { useState, useEffect } from "react";
import Add from "./AddFunc";
import Search from "./SearchF";
import Badge from "@mui/material/Badge";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types

function Workspace({ dl, setDl }) {
  const [ls, setLs] = useState([]);
  const [open, setOpen] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectIds = await getListProject();
        const projects = await Promise.all(
          projectIds.map((id) => getProject(id))
        );
        setLs(projects);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu project: ", error);
      }
      try {
        const deadlineIds = await getListDeadline();
        const deadlines = await Promise.all(
          deadlineIds.map((id) => getDeadline(id))
        );
        setDl(deadlines);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu deadline: ", error);
      }
    };
    fetchData();
  }, []);

  const openForm = () => {
    setOpen(true);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {open && <Add setLs={setLs} open={open} setOpen={setOpen} />}
      <div className={style.Container}>
        <div className={style.Workspaces}>
          <div className={style.AddGroup}>
            <h1>YOUR WORKSPACES</h1>
            <button className={style.BAdd} onClick={openForm}>
              +
            </button>
            <Search setKeySearch={setKeySearch} />
          </div>
          <section>
            <ListItem list={ls} setLs={setLs} searchKey={keySearch} />
          </section>
          <Badge
            badgeContent={dl.length}
            sx={{ width: "110px" }}
            color="primary"
          >
            <h1 className={style.AllDeadline}>DEADLINES</h1>
          </Badge>

          <section>
            <ListDeadline list={dl} />
          </section>
        </div>
      </div>
    </>
  );
}
export default Workspace;
