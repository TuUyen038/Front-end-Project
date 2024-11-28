/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { deleteProject, getListProject, getProject } from "../services";

export default function Delete({ setLs, item }) {
  const handleDelete = (id) => async (ev) => {
    ev.preventDefault();
    const e = window.confirm("Do you want to delete this project?");
    if (e === false) return;
    await deleteProject(id);
    const projectIds = await getListProject();
    const updatedProjects = await Promise.all(
      projectIds.map((projectId) => getProject(projectId))
    );
    setLs(updatedProjects);
  };
  return (
    <div>
      <div>
        <Button
          sx={{ border: "none", fontSize: "1.3rem" }}
          className="btnn"
          onClick={(ev) => handleDelete(item._id)(ev)}
          variant="outlined"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
