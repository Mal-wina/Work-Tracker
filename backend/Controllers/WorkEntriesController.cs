using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
}