import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import "./DashboardPage.css";

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalEmployees: number;
  totalWorkEntries: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>{stats?.totalProjects}</h2>
          <p>Total Projects</p>
        </div>

        <div className="dashboard-card">
          <h2>{stats?.activeProjects}</h2>
          <p>Active Projects</p>
        </div>

        <div className="dashboard-card">
          <h2>{stats?.totalEmployees}</h2>
          <p>Employees</p>
        </div>

        <div className="dashboard-card">
          <h2>{stats?.totalWorkEntries}</h2>
          <p>Work Entries</p>
        </div>
      </div>
    </div>
  );
}
