namespace backend.Models;

public class Project
{
    public int Id { get; set; }

    public string ProjectNumber { get; set; } = string.Empty;
    public string ProjectName { get; set; } = string.Empty;
    public string? CustomerName { get; set; }

    public bool IsActive { get; set; } = true;

    public List<WorkEntry> WorkEntries { get; set; } = new();
}