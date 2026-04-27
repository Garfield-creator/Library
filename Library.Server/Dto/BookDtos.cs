using System.ComponentModel.DataAnnotations;

namespace Library.Server.Dto;

public record BookUpsertDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Author { get; set; } = string.Empty;

    [Required]
    public DateTime PublishingDate { get; set; }
}

public record BookReadDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public DateTime PublishingDate { get; set; }
}