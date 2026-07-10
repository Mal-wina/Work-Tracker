const API_BASE_URL = "http://localhost:5100/api";

export async function getDashboardStats() {
  const [projectsResponse, usersResponse, workEntriesResponse] =
    await Promise.all([
      fetch(`${API_BASE_URL}/Projects`),
      fetch(`${API_BASE_URL}/Users`),
      fetch(`${API_BASE_URL}/WorkEntries`),
    ]);

  if (
    !projectsResponse.ok ||
    !usersResponse.ok ||
    !workEntriesResponse.ok
  ) {
    throw new Error("Failed to load dashboard data");
  }

  const projects = await projectsResponse.json();
  const users = await usersResponse.json();
  const workEntries = await workEntriesResponse.json();

  return {
    totalProjects: projects.length,
    activeProjects: projects.filter(
      (project: { isActive: boolean }) => project.isActive
    ).length,
    totalEmployees: users.length,
    totalWorkEntries: workEntries.length,
  };
}