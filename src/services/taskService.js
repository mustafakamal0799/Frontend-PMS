import api from "../api/axios";

export const getTask = (projectId) => api.get(`/task/${projectId}/list`);
export const createTask = (projectId, data) =>
  api.post(`task/${projectId}/save`, data);
export const updateTask = (id, data) => api.put(`/task/update/${id}`, data);
export const deleteTask = (id) => api.delete(`/task/delete/${id}`);
