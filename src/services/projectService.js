import api from "../api/axios";

export const getProject = () => api.get("/project/list");
export const createProject = (data) => api.post("/project/save", data);
export const updateProject = (id, data) =>
  api.put(`/project/update/${id}`, data);
export const deleteProject = (id) => api.delete(`/project/delete/${id}`);
