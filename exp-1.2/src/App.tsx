import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import CreateDraft from "./pages/CreateDraft";
import Drafts from "./pages/Drafts";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import { useAppDispatch } from "./app/hooks";
import { restoreSession } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(
        restoreSession({
          token,
          user: JSON.parse(user),
        })
      );
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <RoleProtectedRoute
            allowedRoles={["admin", "editor"]}
             >
             <CreateDraft />
          </RoleProtectedRoute>
         }
      />

      <Route
        path="/drafts"
        element={
          <ProtectedRoute>
            <Drafts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;