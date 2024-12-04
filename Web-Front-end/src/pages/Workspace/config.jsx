export const getApiProject = (id) => {
  return "http://localhost:8017/v1/projects/" + (id ? `${id}` : "");
};
export const getApiDeadline = (id) => {
  return "http://localhost:8017/v1/cards/" + (id ? `${id}` : "");
};
