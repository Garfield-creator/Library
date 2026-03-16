using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Library.Server.Dto;

public record RegisterDto
{
    [Required(ErrorMessage = "Användarnamn är obligatoriskt.")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "Användarnamnet måste vara mellan 3 och 20 tecken.")]
    public string Username { get; set; }

    [Required(ErrorMessage = "Email är obligatoriskt.")]
    [EmailAddress(ErrorMessage = "Email är ogiltig.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Lösenord är obligatoriskt.")]
    [DataType(DataType.Password)]
    [StringLength(50, MinimumLength = 6, ErrorMessage = "Lösenordet måste vara mellan 8 och 50 tecken.")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$",
    ErrorMessage = "Lösenordet måste innehålla minst en versal, en gemen, en siffra och ett specialtecken.")]
    public string Password { get; set; }
}
