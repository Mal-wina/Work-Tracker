import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import UsersPage from "./pages/UsersPage";
import WorkEntriesPage from "./pages/WorkEntriesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>{" "}
        <Link to="/projects">Projects</Link>{" "}
        <Link to="/users">Employees</Link>{" "}
        <Link to="/workentries">Work Entries</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/workentries" element={<WorkEntriesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;