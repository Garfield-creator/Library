using System.ComponentModel.DataAnnotations;

namespace Library.Server.Dto;

public record BookUpdateDto
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    public DateTime PublishingDate { get; set; }
}