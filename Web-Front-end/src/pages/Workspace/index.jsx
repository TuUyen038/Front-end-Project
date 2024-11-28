import ListItem from "./ListItem";
import style from "./Workspace.module.css";
import ListDeadline from "./ListDeadline";
import { getProject, getListProject } from "./services";
import { useState, useEffect, useRef } from "react";
import Add from "./AddFunc";
// eslint-disable-next-line react/prop-types

function Workspace() {
  const [ls, setLs] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const refInput = useRef({});
  const [open, setOpen] = useState(false);

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
          </div>
          <section>
            <ListItem list={ls} setLs={setLs} />
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
