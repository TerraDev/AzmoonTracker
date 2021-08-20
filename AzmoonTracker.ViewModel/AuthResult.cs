using System;
using System.Collections.Generic;
using System.Text;

namespace AzmoonTracker.ViewModels
{
    public class AuthResult
    {
        public string Token { get; set; }
        //public string RefreshToken { get; set; }
        public string Username { get; set; }
        public string UserId { get; set; }
        public bool IsSuccessful { get; set; }
        public List<string> Errors { get; set; }
    }
}
