using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Route("api/getemployees")]
[ApiController]
// [Authorize]
public class GetEmployeesController : ControllerBase
{
    private readonly AppDbContext _context;

    public GetEmployeesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _context.Employees.ToListAsync();
        return Ok(employees);
    }
}