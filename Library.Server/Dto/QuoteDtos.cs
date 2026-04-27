using System.ComponentModel.DataAnnotations;

namespace Library.Server.Dto;

public class QuoteReadDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
}

public class QuoteUpsertDto
{
    [Required]
    [StringLength(400)]
    public string Text { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Source { get; set; } = string.Empty;
}

