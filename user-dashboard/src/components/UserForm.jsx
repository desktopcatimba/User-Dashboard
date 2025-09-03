import { useState } from "react";
import "./all.css";

export default function UserForm({ onSubmit, initialData }) {
  const [form, setForm] = useState(initialData || { nome: "", email: "", idade: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nome: "", email: "", idade: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="number"
        name="idade"
        value={form.idade}
        onChange={handleChange}
        placeholder="Idade"
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
