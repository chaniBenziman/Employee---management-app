using EmployeesManagement.Core.Models;

namespace EmployeesManagement.DTO
{
    public class EmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsActive { get; set; }
        List<PositionEmployee> PositionEmployees { get; set; }


    }
}
