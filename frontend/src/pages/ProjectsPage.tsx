import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject, updateProject} from "../api/project";
import type { Project } from "../types/project";


export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);


    const [projectNumber, setProjectNumber] = useState("");
    const [projectName, setProjectName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [isActive, setIsActive] = useState(true);

    const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
    
    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch(console.error);
    }, []);

    const resetForm = () => {
        setProjectNumber("");
        setProjectName("");
        setCustomerName("");
        setIsActive(true);
        setEditingProjectId(null);
    };

      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const projectData = {
                projectNumber,
                projectName,
                customerName,
                isActive,
        };

        if (editingProjectId !== null) {
            await updateProject(editingProjectId, projectData);

        setProjects((currentProjects) =>
          currentProjects.map((project) =>
            project.id === editingProjectId
              ? { ...project, ...projectData }
              : project
          )
        );
      } else {
        const newProject = await createProject(projectData);

        setProjects((currentProjects) => [
          ...currentProjects,
          newProject,
        ]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectNumber(project.projectNumber);
    setProjectName(project.projectName);
    setCustomerName(project.customerName);
    setIsActive(project.isActive);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id);

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== id)
      );

      if (editingProjectId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
            <h1>Projects</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Project number"
                    value={projectNumber}
                    onChange={(e) => setProjectNumber(e.target.value)} 
                />
                
                <input type="text"
                    placeholder="Project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)} 
                />

                <input type="text"
                    placeholder="Customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)} 
                />

                <label>
                    <input type="checkbox"
                    checked={isActive}    
                    onChange={(e) => setIsActive(e.target.checked)} 
                />
                Active
                </label>

                 <button type="submit">
                    {editingProjectId !== null ? "Save Changes" : "Add Project"}
                </button>
           

            {editingProjectId !== null && (
                <button type="button" onClick={resetForm}>
                Cancel
                </button>
            )}
            </form>

            <hr />


            {projects.length === 0 ? (
                <p>No projects found</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Project Number</th>
                            <th>Name</th>
                            <th>Customer</th>
                            <th>Active</th>
                        </tr>
                    </thead>

                   <tbody>

                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.projectNumber}</td>
                            <td>{project.projectName}</td>
                            <td>{project.customerName}</td>
                            <td>{project.isActive ? "Yes" : "No"}</td>
                            <td>
                                 <button
                                type="button"
                                onClick={() => handleEdit(project)}
                                >
                                Edit
                                </button>

                                <button
                                type="button"
                                onClick={() => handleDelete(project.id)}
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
}
