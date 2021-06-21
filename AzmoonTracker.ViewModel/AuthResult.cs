using System;
using System.Collections.Generic;
using System.Text;

namespace AzmoonTracker.ViewModels
{
    public class AuthResult
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public bool IsSuccessful { get; set; }
        public List<string> Errors { get; set; }
    }
}
