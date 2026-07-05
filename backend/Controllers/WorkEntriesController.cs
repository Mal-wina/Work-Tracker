using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkEntriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public WorkEntriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkEntry>>> GetWorkEntries()
    {
        return await _context.WorkEntries.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<WorkEntry>> CreateWorkEntry(CreateWorkEntryDto dto)
    {
    var workEntry = new WorkEntry
    {
        UserId = dto.UserId,
        ProjectId = dto.ProjectId,
        WorkDate = dto.WorkDate,
        StartTime = dto.StartTime,
        EndTime = dto.EndTime,
        BreakMinutes = dto.BreakMinutes,
        Notes = dto.Notes
    };

    _context.WorkEntries.Add(workEntry);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetWorkEntries), new { id = workEntry.Id }, workEntry);
    }
}