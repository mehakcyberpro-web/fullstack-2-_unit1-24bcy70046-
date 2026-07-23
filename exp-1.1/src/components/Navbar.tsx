import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        backgroundColor: "#2563eb",
        color: "white",
      }}
    >
      <h2>Draft Management</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/create" style={{ color: "white", textDecoration: "none" }}>
          Create Draft
        </Link>

        <Link to="/drafts" style={{ color: "white", textDecoration: "none" }}>
          My Drafts
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;