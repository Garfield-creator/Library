using Microsoft.AspNetCore.Identity;

namespace Library.Server.Models;

public class ApplicationUser : IdentityUser
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
}
