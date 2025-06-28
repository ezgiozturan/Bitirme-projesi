import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/api/users/login", {
  email,
  password
});


    if (response.status === 200) {
      login(response.data.email); // useAuth ile login oldu
      navigate("/");
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      alert("Mail adresiniz/şifreniz yanlıştır.");
    } else {
      alert("Mail adresiniz/şifreniz yanlıştır.");
    }
  }
};


  return (
    <div className="max-w-xl mx-auto bg-white p-10 mt-20 shadow-md rounded">
        <h2 className="text-3xl bg-white text-sky-500 font-bold mb-6 text-center">Giriş Yap</h2>
      <form onSubmit={handleLogin} className="space-y-5">
        

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black p-3 rounded bg-sky-100 placeholder-gray-600"
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black p-3 rounded bg-sky-100 placeholder-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-3 rounded font-semibold hover:bg-sky-600"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
