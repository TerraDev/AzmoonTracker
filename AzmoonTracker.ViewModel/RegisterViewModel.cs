using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AzmoonTracker.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        public String Username { get; set; }
        [Required]
        [EmailAddress]
        public String Email { get; set; }
        [Required]
        public String Password { get; set; }
        [Required]
        public String ConfirmPassword { get; set; }
    }
}
