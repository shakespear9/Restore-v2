using System;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly SignInManager<User> _signInManager;

    public AccountController(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Email, Email = registerDto.Email };
        var result = await _signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await _signInManager.UserManager.AddToRoleAsync(user, "Member");

        return Ok();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }

        var user = await _signInManager.UserManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        var roles = await _signInManager.UserManager.GetRolesAsync(user);

        return Ok(new
        {
            user.Email,
            user.UserName,
            Roles = roles
        });
    }


    [HttpPost("logout")]
    public async Task<ActionResult> LogOut()
    {
        await _signInManager.SignOutAsync();

        return NoContent();
    }

    [Authorize]
    [HttpPost("address")]
    public async Task<ActionResult<Address>> AddOrUpdatedAddress(Address address)
    {
        var user = await _signInManager.UserManager.Users.Include(x => x.Address)
                                                         .FirstOrDefaultAsync(x => x.UserName == User.Identity!.Name);

        if (user == null) return Unauthorized();

        user.Address = address;
        var result = await _signInManager.UserManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest("Problem updating user address");
        }
        return Ok(user.Address);
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Address>> GetAddress()
    {
        var address = await _signInManager.UserManager.Users.Where(x => x.UserName == User.Identity!.Name).Select(x => x.Address).FirstOrDefaultAsync();

        if (address == null)
        {
            return NoContent();
        }

        return Ok(address);
    }
}
