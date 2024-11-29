import ListItem from "./ListItem";
import style from "./Workspace.module.css";
import ListDeadline from "./ListDeadline";
import { getProject, getListProject } from "./services";
import { useState, useEffect } from "react";
import Add from "./AddFunc";
import Search from "./SearchF";
// eslint-disable-next-line react/prop-types

function Workspace() {
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
        console.error("Lỗi khi lấy dữ liệu: ", error);
      }
    };
    fetchData();
  }, []);

  const openForm = () => {
    setOpen(true);
  };

  return (
    <>
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
          <h1 className={style.AllDeadline}>DEADLINES</h1>
          <section>
            <ListDeadline list={ls} />
          </section>
        </div>
      </div>
    </>
  );
}
export default Workspace;
