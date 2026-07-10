const API_URL = "http://localhost:5100/api/projects";

export async function getProjects() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to load projects");
    }

    return response.json();
}

export async function createProject(project: {
    projectNumber: string;
    projectName: string;
    customerName: string;
    isActive: boolean;
}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });

    if(!response.ok) {
        throw new Error("Failed to create project");
    }

    return response.json();
}

export async function deleteProject(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete project.");
    }
}