using AzmoonTracker.Services.UserRepository;
using AzmoonTracker.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        //[HttpGet("Profile")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        ////GET : /api/Auth/Profile
        //public async Task<Object> GetUserProfile() //probably should input the token also
        //{
        //    string userId = User.Claims.First(c => c.Type == "UserID").Value;
        //    ApplicationUser user = await userManager.FindByIdAsync(userId);
        //    return new
        //    {
        //        user.UserName,
        //        user.Email
        //    };
        //}
    }
}
