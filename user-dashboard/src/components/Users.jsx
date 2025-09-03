import { useEffect, useState } from "react";
import api from "../services/api";
import UserForm from "../components/UserForm";
import Modal from "./Modal";
import "./all.css"; 

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const addUser = async (user) => {
    if (editingUser) {
      await api.put(`/users/${editingUser.id}`, user);
      setEditingUser(null);
    } else {
      await api.post("/users", user);
    }
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrando pelo nome
  const filteredUsers = users.filter((u) =>
    u.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-container">
      <h1>Usuários</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Formulário (adiciona ou edita) */}
      <UserForm onSubmit={addUser} initialData={editingUser} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Editar Usuário</h2>
        <UserForm onSubmit={addUser} initialData={editingUser} />
      </Modal>


      <table className="users-table">
        <thead>
          <tr>
            <th>Nª</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.idade}</td>
                <td>
                  <button
                    onClick={() => setEditingUser(user)}
                    className="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="delete-btn"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-users">
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
