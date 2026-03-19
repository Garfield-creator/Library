using System.ComponentModel.DataAnnotations;

namespace Library.Server.Dto;

public class QuoteReadDto
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string Source { get; set; }
}

public class QuoteUpsertDto
{
    [Required]
    [StringLength(400)]
    public string Text { get; set; }

    [Required]
    [StringLength(100)]
    public string Source { get; set; }
}

