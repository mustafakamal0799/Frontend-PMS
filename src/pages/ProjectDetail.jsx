import { useState, useEffect } from "react";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const progresTasks = tasks.filter((t) => t.status === "progres");
  const doneTasks = tasks.filter((t) => t.status === "done");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const res = await getTask(id);
    setTasks(res.data.d);
  };

  const addTask = async () => {
    if (!title) return;
    await createTask(id, { title });
    setTitle("");
    fetchTask();
  };

  const changeStatus = async (taskId, status) => {
    console.log("STATUS DIKIRIM:", status);
    await updateTask(taskId, { status });
    fetchTask();
  };

  const removeTask = async (taskId) => {
    if (!confirm("Hapus task?")) return;
    await deleteTask(taskId);
    fetchTask();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Nama task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addTask}
          >
            Tambah Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO LIST */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-4">Todo List</h2>

            <ul className="space-y-3">
              {todoTasks.map((task) => (
                <li
                  key={task.id}
                  className="border rounded p-3 flex-col gap-2 bg-gray-50"
                >
                  <div className="flex justify-between gap-2 mb-3">
                    <span className="font-medium">{task.title}</span>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => removeTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <select
                      className="border rounded px-2 py-2"
                      value={task.status}
                      onChange={(e) => changeStatus(task.id, e.target.value)}
                    >
                      <option value="todo">Todo</option>
                      <option value="progres">Progres</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* PROGRES */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-4">PROGRES LIST</h2>

            <ul className="space-y-3">
              {progresTasks.map((task) => (
                <li key={task.id} className="border rounded p-3 flex-col gap-2">
                  <div className="flex justify-between gap-2 mb-3">
                    <span className="font-medium">{task.title}</span>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => removeTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <select
                      className="border rounded px-2 py-2"
                      value={task.status}
                      onChange={(e) => changeStatus(task.id, e.target.value)}
                    >
                      <option value="todo">Todo</option>
                      <option value="progres">Progres</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* DONE */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-4">DONE LIST</h2>

            <ul className="space-y-3">
              {doneTasks.map((task) => (
                <li key={task.id} className="border rounded p-3 flex-col gap-2">
                  <div className="flex justify-between gap-2 mb-3">
                    <span className="font-medium">{task.title}</span>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => removeTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <select
                      className="border rounded px-2 py-2"
                      value={task.status}
                      onChange={(e) => changeStatus(task.id, e.target.value)}
                    >
                      <option value="todo">Todo</option>
                      <option value="progres">Progres</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
