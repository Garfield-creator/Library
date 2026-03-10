namespace Library.Server.Dto;

public class QuoteReadDto
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string Source { get; set; }
}

public class QuoteCreateDto
{
    public string Text { get; set; }
    public string Source { get; set; }
}

public class QuoteUpdateDto
{
    public string Text { get; set; }
    public string Source { get; set; }
}

