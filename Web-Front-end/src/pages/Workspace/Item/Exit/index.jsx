/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { exitProject, getDeadline, getListDeadline, getListProject, getProject } from "../../services";

export default function Exit({ setLs, item, setDl }) {
  const handleExit = (id) => async (ev) => {
    ev.preventDefault();
    const e = window.confirm("Do you want to exit this project?");
    if (e === false) return;
    const kq = await exitProject(id);
    if (!kq) return;
    const projectIds = await getListProject();
    const updatedProjects = await Promise.all(
      projectIds.map((projectId) => getProject(projectId))
    );

    setLs(updatedProjects);
    const dlIds = await getListDeadline();
    const updatedDl = await Promise.all(dlIds.map((id) => getDeadline(id)));
    setDl(updatedDl);
  };
  return (
    <div>
      <div>
        <Button
          sx={{ border: "none", fontSize: "1.3rem" }}
          className="btnn"
          onClick={(ev) => handleExit(item._id)(ev)}
          variant="outlined"
        >
          Exit
        </Button>
      </div>
    </div>
  );
}
