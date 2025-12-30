using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

[Route("api/searchemployee")]
[ApiController]
// [Authorize]
public class SearchEmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public SearchEmployeeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Search(SearchEmployeeModel model)
    {
        var query = _context.Employees.AsQueryable();

        if (!string.IsNullOrEmpty(model.Name))
            query = query.Where(e => e.Name.Contains(model.Name));

        if (!string.IsNullOrEmpty(model.City))
            query = query.Where(e => e.City.Contains(model.City));

        if (!string.IsNullOrEmpty(model.EmployeeNumber))
            query = query.Where(e => e.EmployeeNumber.Contains(model.EmployeeNumber));

        var results = await query.ToListAsync();
        return Ok(results);
    }
}