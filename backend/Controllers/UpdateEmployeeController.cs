using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Route("api/updateemployee")]
[ApiController]
// [Authorize]
public class UpdateEmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public UpdateEmployeeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateEmployeeModel model)
    {
        var employee = await _context.Employees.FindAsync(model.EmployeeId);
        if (employee == null) return NotFound();

        employee.EmployeeNumber = model.EmployeeNumber;
        employee.Name = model.Name;
        employee.City = model.City;
        employee.Salary = model.Salary;
        employee.AvatarImage = model.AvatarImage ?? employee.AvatarImage; // अगर नया नहीं तो पुराना

        await _context.SaveChangesAsync();
        return Ok(employee);
    }
}