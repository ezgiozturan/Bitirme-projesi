import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", {
        email: form.email,
        password: form.password,
      });
      alert("Kayıt başarılı!");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Zaten üyesiniz. Giriş yapınız.");
        navigate("/login");
      } else {
        alert("Mail adresinizle daha önce kayıt yapılmıştır.Giriş yapmayı deneyiniz.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-10 mt-20 shadow-md rounded">
      <h2 className="text-3xl bg-white text-sky-500 font-bold mb-6 text-center">
        Üye Ol
      </h2>
      <form onSubmit={handleRegister} className="space-y-5">
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          className="w-full text-black p-3 rounded bg-sky-100 placeholder-gray-600"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handleChange}
          className="w-full text-black p-3 rounded bg-sky-100 placeholder-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-3 rounded font-semibold hover:bg-sky-600"
        >
          Kaydol
        </button>
      </form>
    </div>
  );
};

export default Register;
