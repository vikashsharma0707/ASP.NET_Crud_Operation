using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Route("api/viewemployee")]
[ApiController]
// [Authorize]
public class ViewEmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public ViewEmployeeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> View(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return NotFound();
        return Ok(employee);
    }
}