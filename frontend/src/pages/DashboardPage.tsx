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

  if (!stats) {
    return null;
  }


  return (
    <section className="dashboard-page">
      <header className="dashboard-header">
    <div>
      <p className="dashboard-eyebrow">Company overview</p>
      <h1>Good morning</h1>
      <p className="dashboard-subtitle">Here is a quick overview of the company today.</p>
    </div>

    <div className="dashboard-date">
      <span>Today</span>
      <strong>
        {new Intl.DateTimeFormat("nb-NO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date())}
      </strong>
    </div>

    <div className="dashboard-summary-grid">
      <article className="summary-card">
        <div className="summary-icon">P</div>
      
        <div>
            <p>Total projects</p>
            <h2>{stats.totalProjects}</h2>
          </div>
        </article>

         <article className="summary-card">
          <div className="summary-icon">A</div>

          <div>
            <p>Active projects</p>
            <h2>{stats.activeProjects}</h2>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon">E</div>

          <div>
            <p>Employees</p>
            <h2>{stats.totalEmployees}</h2>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon">W</div>

          <div>
            <p>Work entries</p>
            <h2>{stats.totalWorkEntries}</h2>
          </div>
        </article>
      </div>

      <div className="dashboard-content-grid">
        <section className="dashboard-panel dashboard-main-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-eyebrow">Overview</p>
              <h2>Recent activity</h2>
            </div>

            <button type="button" className="secondary-button">
              View all
            </button>
          </div>

          <div className="empty-state">
            <h3>No recent work entries yet</h3>
            <p>
              New work entries will appear here when employees start logging
              their hours.
            </p>
          </div>
        </section>

        <aside className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-eyebrow">Projects</p>
              <h2>Current status</h2>
            </div>
          </div>

          <div className="status-list">
            <div className="status-row">
              <span>Total projects</span>
              <strong>{stats.totalProjects}</strong>
            </div>

            <div className="status-row">
              <span>Active projects</span>
              <strong>{stats.activeProjects}</strong>
            </div>

            <div className="status-row">
              <span>Employees</span>
              <strong>{stats.totalEmployees}</strong>
            </div>
          </div>
        </aside>
      </div>
      </section>
  );
}
