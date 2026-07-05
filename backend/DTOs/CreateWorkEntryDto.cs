namespace backend.DTOs;

public class CreateWorkEntryDto
{
    public int UserId { get; set; }
    public int ProjectId { get; set; }

    public DateOnly WorkDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }

    public int BreakMinutes { get; set; }
    public string? Notes { get; set; }
}