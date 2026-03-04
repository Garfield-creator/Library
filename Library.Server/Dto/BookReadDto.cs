namespace Library.Server.Dto;

public record BookReadDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public DateTime PublishingDate { get; set; }
}