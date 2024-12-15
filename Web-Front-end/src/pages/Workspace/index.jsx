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
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types

function Workspace() {
  const [ls, setLs] = useState([]);
  const [open, setOpen] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const currentDay = new Date();
  const [dl, setDl] = useState([]);
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
        const listDl = deadlines.filter(
          (item) =>
            new Date(item.deadline) >= currentDay &&
            item.deadlinestatus == "not_done"
        );

        setDl(listDl);
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
        autoClose={5000}
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
            <ListItem
              list={ls}
              setLs={setLs}
              searchKey={keySearch}
              setDl={setDl}
            />
          </section>

          <div className={style.groupDl}>
            <Badge
              badgeContent={dl.length}
              sx={{ width: "110px" }}
              color="primary"
            >
              <h1 className={style.AllDeadline}>DEADLINES</h1>
            </Badge>
            {dl.length > 3 ? (
              <Link to="/calendar">
                <div
                  className={style.grp}
                  style={{
                    padding: "0px 6px",
                    borderRadius: "5px",
                    background: "hsla(163, 36%, 71%, 0.288)",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "500",
                    display: "flex",
                    gap: "4px",
                    fontSize: "1.2rem",
                    color: "#999",
                  }}
                >
                  <p style={{ color: "#999" }}>See more</p>

                  <ReadMoreIcon sx={{ fontSize: "2.5rem" }} />
                </div>
              </Link>
            ) : null}
          </div>
          <section>
            <ListDeadline list={dl} />
          </section>
        </div>
      </div>
    </>
  );
}
export default Workspace;
