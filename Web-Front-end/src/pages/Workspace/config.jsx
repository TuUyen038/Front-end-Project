export const getApiProject = (id) => {
  return "http://localhost:8017/v1/projects/" + (id ? `${id}` : "");
};
export const getApiDeadline = (id) => {
  return "http://localhost:8017/v1/cards/" + (id ? `${id}` : "");
};
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGQ1NzlkMmRjMWFiNTc3MDg5ZjBkZiIsImlhdCI6MTczMzEyMjEwMCwiZXhwIjoxNzM1NzE0MTAwfQ.pqh3Xu24gHtJi60KqH_Mh6akO6As2YS-Fb2a2vuayps"
