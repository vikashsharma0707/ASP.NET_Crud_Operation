using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Route("api/deleteemployee")]
[ApiController]
// [Authorize]
public class DeleteEmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public DeleteEmployeeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return NotFound();

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return Ok();
    }
}