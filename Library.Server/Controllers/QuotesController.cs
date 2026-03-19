using Library.Server.Dto;
using Library.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Library.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/quotes")]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _db;
    private const int MaxQuotesPerUser = 5;

    public QuotesController(AppDbContext db)
    {
        _db = db;
    }

    // GET: api/quotes
    [HttpGet()]
    public async Task<ActionResult<IEnumerable<QuoteReadDto>>> GetAll()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var quotes = await _db.Quotes
            .AsNoTracking()
            .Where(q => q.UserId == userId)
            .Select(QuoteSelector)
            .ToListAsync();

        return Ok(quotes);
    }

    // GET: api/quotes/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<QuoteReadDto>> GetById(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var quote = await _db.Quotes
            .AsNoTracking()
            .Where(q => q.UserId == userId && q.Id == id)
            .Select(QuoteSelector)
            .FirstOrDefaultAsync();

        if (quote == null)
            return NotFound();

        return Ok(quote);
    }

    // POST: api/quotes
    [HttpPost]
    public async Task<ActionResult<QuoteReadDto>> Post(QuoteUpsertDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var existingCount = await _db.Quotes
            .AsNoTracking()
            .CountAsync(q => q.UserId == userId);

        if (existingCount >= MaxQuotesPerUser)
        {
            return Conflict(new
            {
                message = $"Max {MaxQuotesPerUser} quotes per user."
            });
        }

        var quote = new Quote
        {
            Text = dto.Text,
            Source = dto.Source,
            UserId = userId
        };

        _db.Quotes.Add(quote);
        await _db.SaveChangesAsync();

        var readDto = new QuoteReadDto
        {
            Id = quote.Id,
            Text = quote.Text,
            Source = quote.Source
        };

        return CreatedAtAction(nameof(GetById), new { id = quote.Id }, readDto);
    }

    // PUT: api/quotes/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, QuoteUpsertDto dto)
    {
        var quote = await _db.Quotes.FindAsync(id);

        if (quote == null)
            return NotFound();

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();
        if (quote.UserId != userId)
            return Forbid();

        quote.Text = dto.Text;
        quote.Source = dto.Source;

        await _db.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/quotes/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var quote = await _db.Quotes.FindAsync(id);

        if (quote == null)
            return NotFound();

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();
        if (quote.UserId != userId)
            return Forbid();

        _db.Quotes.Remove(quote);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    private static readonly Expression<Func<Quote, QuoteReadDto>> QuoteSelector =
        q => new QuoteReadDto
        {
            Id = q.Id,
            Text = q.Text,
            Source = q.Source
        };
}

