import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateDraft from "./pages/CreateDraft";
import Drafts from "./pages/Drafts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/create"
        element={<CreateDraft />}
      />

      <Route
        path="/drafts"
        element={<Drafts />}
      />
    </Routes>
  );
}

export default App;