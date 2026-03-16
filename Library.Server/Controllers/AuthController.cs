using Library.Server.Dto;
using Library.Server.Models;
using Library.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly JwtService _jwtService;

    public AuthController(
        UserManager<IdentityUser> userManager,
        JwtService jwtService)
    {
        _userManager = userManager;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingUser = await _userManager.FindByNameAsync(model.Username);

        if (existingUser != null)
            return BadRequest(new { message = "Användarnamnet är upptaget" });

        var existingEmail = await _userManager.FindByEmailAsync(model.Email);

        if (existingEmail != null)
            return BadRequest(new { message = "Email-adressen är upptagen" });

        var user = new IdentityUser
        {
            UserName = model.Username,
            Email = model.Email
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
            return BadRequest(new { message = "Registrering misslyckades" });

        var token = _jwtService.GenerateToken(user);

        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
            return Unauthorized();

        var validPassword = await _userManager.CheckPasswordAsync(user, model.Password);

        if (!validPassword)
            return Unauthorized();

        var token = _jwtService.GenerateToken(user);

        return Ok(new { token });
    }
}