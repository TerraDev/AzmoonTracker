using AzmoonTracker.Services.UserRepository;
using AzmoonTracker.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AzmoonTracker.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserRepository userRepository;

        public AuthController(IUserRepository _UserRepository)
        {
            userRepository = _UserRepository;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<AuthResult>> RegisterUser(RegisterViewModel RVM)
        {
            if (ModelState.IsValid)
            {
                AuthResult result = await userRepository.RegisterAsync(RVM);
                if (result.IsSuccessful)
                    return Ok(result);
                else
                    return BadRequest(result);
            }

            return BadRequest(new AuthResult
            {
                IsSuccessful = false,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

        [HttpGet("TestAuth")]
        [Authorize]
        public IActionResult Test()
        {
            return Ok("this works!");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser(LoginViewModel LVM)
        {
            if (ModelState.IsValid)
            {
                AuthResult result = await userRepository.LoginAsync(LVM);
                if (result.IsSuccessful)
                    return Ok(result);
                else
                    return BadRequest(result);
            }

            return BadRequest(new AuthResult()
            {
                Errors = new List<string>() {
                        "Invalid payload"
                    },
                IsSuccessful = false
            });
        }

        [HttpGet("Profile")]
        [Authorize]
        public IActionResult GetUserProfile() //probably should input the token also
        {
            //string userId = User.Claims.First(c => c.Type == "UserID").Value;//outdated??
            //string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);//gives user Id
            //UserPanelViewModel Panel= await userRepository.GetUserByIdAsync(userId);

            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            // will give the user's Email

            var userName = User.FindFirstValue(ClaimTypes.GivenName);
            // will give the user's username

            return Ok(new UserPanelViewModel { 
                UserName=userName,
                Email=userEmail
            });
        }
    }
}
