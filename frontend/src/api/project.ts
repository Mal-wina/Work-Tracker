const API_URL = "http://localhost:5100/api/projects";

export async function getProjects() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to load projects");
    }

    return response.json();
}