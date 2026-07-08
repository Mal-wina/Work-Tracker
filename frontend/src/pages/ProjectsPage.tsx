import { useEffect, useState } from "react";
import { getProjects } from "../api/project";
import type { Project } from "../types/project";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Projects</h1>

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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
