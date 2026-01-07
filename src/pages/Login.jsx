import { useState, useEffect } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/project";
    } catch (err) {
      console.log(err.response?.data);
      alert("login gagal");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-300 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-sm p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl text-center mb-9 font-bold">LOGIN</h2>
        <div className="mb-4">
          <input
            className="block mb-3 border p-2 w-full rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            className="block mb-3 border p-2 w-full rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <button className="bg-indigo-600 p-2 text-white rounded w-full hover:cursor-pointer hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
}
