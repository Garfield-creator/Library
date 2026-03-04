using Library.Server.Dto;
using Library.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Library.Server.Services;

namespace Library.Server.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _config;
    private readonly JwtService _jwtService;

    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config, JwtService jwtService)
    {
        _userManager = userManager;
        _config = config;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Username,
            Email = model.Email
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
    {
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