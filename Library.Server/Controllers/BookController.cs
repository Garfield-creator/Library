using Library.Server.Dto;
using Library.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Library.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/books")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _db;

    public BooksController(AppDbContext db)
    {
        _db = db;
    }

    // GET: api/books
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookReadDto>>> GetAll()
    {
        var books = await _db.Books
            .AsNoTracking()
            .Select(BookSelector)
            .ToListAsync();

        return Ok(books);
    }

    // GET: api/books/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<BookReadDto>> GetById(int id)
    {
        var book = await _db.Books
            .AsNoTracking()
            .Select(BookSelector)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
            return NotFound();

        return Ok(book);
    }

    // POST: api/books
    [HttpPost]
    public async Task<ActionResult<BookReadDto>> Post(BookCreateDto dto)
    {
        Console.WriteLine(dto);
        var book = new Book
        {
            Title = dto.Title,
            Author = dto.Author,
            PublishingDate = dto.PublishingDate
        };

        _db.Books.Add(book);
        await _db.SaveChangesAsync();

        var readDto = new BookReadDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            PublishingDate = book.PublishingDate
        };

        return CreatedAtAction(nameof(GetById), new { id = book.Id }, readDto);
    }

    // PUT: api/books/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, BookUpdateDto dto)
    {
        var book = await _db.Books.FindAsync(id);

        if (book == null)
            return NotFound();

        book.Title = dto.Title;
        book.Author = dto.Author;
        book.PublishingDate = dto.PublishingDate;

        await _db.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/books/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var book = await _db.Books.FindAsync(id);

        if (book == null)
            return NotFound();

        _db.Books.Remove(book);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    private static readonly Expression<Func<Book, BookReadDto>> BookSelector =
    b => new BookReadDto
    {
        Id = b.Id,
        Title = b.Title,
        Author = b.Author,
        PublishingDate = b.PublishingDate
    };
}