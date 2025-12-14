import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();   // <-- ADD THIS

 const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      username,
      password,
    });

    // ⭐ FIX — SAVE TOKEN
    localStorage.setItem("token", res.data.token);

    alert("LOGIN SUCCESS");
    console.log(res.data);

    navigate("/");  // redirect
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data || err.message);
    alert("Login failed: " + (err.response?.data?.error || err.message));
  }
};

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
