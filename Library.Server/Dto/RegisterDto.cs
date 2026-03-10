using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Library.Server.Dto;

public record RegisterDto
{
    [Required]
    [StringLength(50)]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}
