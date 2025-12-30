namespace Backend.Models
{
    public class InsertEmployeeModel
    {
        public string EmployeeNumber { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public decimal Salary { get; set; }
        // Avatar ऑटो असाइन होगा
    }
}