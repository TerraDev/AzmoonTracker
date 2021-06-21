using AzmoonTracker.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzmoonTracker.Services.UserRepository
{
    public interface IUserRepository
    {
        Task<AuthResult> LoginAsync(LoginViewModel LogonVM);

        Task<AuthResult> RegisterAsync(RegisterViewModel RVM);

        void Logout();
    }
}
