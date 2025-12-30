using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using System;
using Microsoft.AspNetCore.Authorization;

[Route("api/insertemployee")]
[ApiController]
// [Authorize] // JWT प्रोटेक्शन
public class InsertEmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public InsertEmployeeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Insert(InsertEmployeeModel model)
    {
        var employee = new Employee
        {
            EmployeeNumber = model.EmployeeNumber,
            Name = model.Name,
            City = model.City,
            Salary = model.Salary,
            AvatarImage = $"https://i.pravatar.cc/150?u={Guid.NewGuid()}" // रैंडम अवतार
        };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        return Ok(employee);
    }
}