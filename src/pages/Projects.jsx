import { useState, useEffect } from "react";
import {
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../services/projectService";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await getProject();
    setProjects(res.data.d);
  };

  const addProjects = async () => {
    await createProject({ title, description });
    setTitle("");
    setDescription("");
    fetchProjects();
  };

  const startEdit = async (project) => {
    setEditId(project.id);
    setTitle(project.title);
    setDescription(project.description ?? "");
  };

  const saveEdit = async () => {
    await updateProject(editId, {
      title,
      description,
    });

    setEditId(null);
    setTitle("");
    setDescription("");
    fetchProjects();
  };

  const removeProject = async (id) => {
    if (!confirm("Yakin hapus project ?")) return;
    await deleteProject(id);
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center p-4 text-4xl font-bold">MY PROJECT</h2>

        <div className="flex gap-2 p-4 bg-white shadow rounded mb-3">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Judul Project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={saveEdit}
            className="bg-gray-500 text-white rounded px-3 shadow hover:cursor-pointer hover:bg-gray-600"
          >
            Edit
          </button>
          <button
            onClick={addProjects}
            className="bg-green-400 rounded px-3 shadow hover:cursor-pointer hover:bg-green-500"
          >
            Tambah
          </button>
        </div>

        <div className="flex flex-col p-3 bg-white shadow gap-2">
          {projects.map((p) => (
            <ul key={p.id}>
              <div>
                <strong>
                  <Link to={`/project/${p.id}`}>{p.title}</Link>
                </strong>
              </div>
              <div>{p.description}</div>
              <div>
                <button
                  className="bg-gray-500 text-white rounded px-3 shadow hover:cursor-pointer hover:bg-gray-600"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 rounded px-3 shadow hover:cursor-pointer hover:bg-red-500"
                  onClick={() => removeProject(p.id)}
                >
                  Hapus
                </button>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
