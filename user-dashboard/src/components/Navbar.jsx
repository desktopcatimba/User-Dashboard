import { Link } from "react-router-dom";
import "./all.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">User Dashboard</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/users">Usuários</Link>
      </div>
    </nav>
  );
}
