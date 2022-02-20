using FootballManager.Services;
using FootballManager.ViewModels.Users;
using MyWebServer.Controllers;
using MyWebServer.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FootballManager.Controllers
{
    public class UsersController : Controller
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        public HttpResponse Register()
        {
            if (User.IsAuthenticated)
            {
                return Redirect("/");
            }

            return View();
        }

        [HttpPost]
        public HttpResponse Register(RegisterUserFormModel model)
        {
            if (User.IsAuthenticated)
            {
                return Redirect("/");
            }

            if (model.Username.Length < 5 || model.Username.Length > 20)
            {
                return Redirect("/Users/Register");
            }

            if (model.Email.Length < 10 || model.Email.Length > 60)
            {
                return Redirect("/Users/Register");
            }

            if (userService.UsernameExists(model.Username))
            {
                return Redirect("/Users/Register");
            }

            if (string.IsNullOrWhiteSpace(model.Email) || !Regex.Match(model.Email, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$").Success)
            {
                return Redirect("/Users/Register");
            }

            if (userService.EmailExists(model.Email))
            {
                return Redirect("/Users/Register");
            }

            if (model.Password.Length < 5 || model.Password.Length > 20)
            {
                return Redirect("/Users/Register");
            }

            if (model.Password != model.ConfirmPassword)
            {
                return Redirect("/Users/Register");
            }

            userService.Register(model.Username, model.Email, model.Password);

            return Redirect("Login");
        }

        public HttpResponse Login()
        {
            if (User.IsAuthenticated)
            {
                return Redirect("/");
            }

            return View();
        }

        [HttpPost]
        public HttpResponse Login(LoginUserFormModel model)
        {
            if (User.IsAuthenticated)
            {
                return Redirect("/");
            }

            string userId = userService.GetUserId(model.Username, model.Password);

            if (userId is null)
            {
                return Redirect("/Users/Login");
            }

            SignIn(userId);

            return Redirect("/");
        }

        public HttpResponse Logout()
        {
            if (!User.IsAuthenticated)
            {
                return Redirect("Login");
            }

            SignOut();

            return Redirect("/");
        }
    }
}
