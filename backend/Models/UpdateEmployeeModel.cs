namespace Backend.Models
{
    public class UpdateEmployeeModel
    {
        public int EmployeeId { get; set; }
        public string EmployeeNumber { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public decimal Salary { get; set; }
        public string AvatarImage { get; set; } // ऑप्शनल अपडेट
    }
}