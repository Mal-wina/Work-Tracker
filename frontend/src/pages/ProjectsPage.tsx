import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject} from "../api/project";
import type { Project } from "../types/project";


export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);


    const [projectNumber, setProjectNumber] = useState("");
    const [projectName, setProjectName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [isActive, setIsActive] = useState(true);
    
    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch(console.error);
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const newProject = await createProject({
                projectNumber,
                projectName,
                customerName,
                isActive,
            });

            setProjects((currentProjects) => [...currentProjects, newProject]);

            setProjectNumber("");
            setProjectName("");
            setCustomerName("");
            setIsActive(true);
        } catch (error) {
        console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProject(id);

            setProjects((currentProjects) =>
                currentProjects.filter((project) => project.id !== id)
        );
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

                <button type="submit">Add Project</button>
            </form>
            
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
                                    <button type="button" onClick={() => handleDelete(project.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
