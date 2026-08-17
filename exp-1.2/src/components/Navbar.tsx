import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUserRole } from "../features/auth/authSelectors";

const Navbar = () => {
  const role = useAppSelector(selectUserRole);
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
      <h2>α-Draft Management</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        {(role === "admin" || role === "editor") && (
        <Link
          to="/create"
         style={{ color: "white", textDecoration: "none" }}
        >
        Create Draft
        </Link>
      )}
      <Link to="/calendar" style={{ color: "white", textDecoration: "none" }}>
        Calendar
      </Link>
      <Link to="/drafts" style={{ color: "white", textDecoration: "none" }}>
        My Drafts
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;