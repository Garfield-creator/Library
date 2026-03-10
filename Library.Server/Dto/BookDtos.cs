using System.ComponentModel.DataAnnotations;

namespace Library.Server.Dto;

public record BookCreateDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; }

    [Required]
    public string Author { get; set; }

    [Required]
    public DateTime PublishingDate { get; set; }
}

public record BookReadDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public DateTime PublishingDate { get; set; }
}

public record BookUpdateDto
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    public DateTime PublishingDate { get; set; }
}