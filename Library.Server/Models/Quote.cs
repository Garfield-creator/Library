namespace Library.Server.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Source { get; set; }

        // Id of the Identity user who owns this quote
        public string UserId { get; set; }
    }
}
