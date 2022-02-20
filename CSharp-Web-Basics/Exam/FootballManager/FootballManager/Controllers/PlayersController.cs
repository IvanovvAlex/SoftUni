using FootballManager.Services;
using FootballManager.ViewModels.Players;
using MyWebServer.Controllers;
using MyWebServer.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballManager.Controllers
{
    public class PlayersController : Controller
    {
        private readonly IPlayerService playerService;
        private readonly IUserService userService;

        public PlayersController(IPlayerService playerService, IUserService userService)
        {
            this.playerService = playerService;
            this.userService = userService;
        }

        public HttpResponse All()
        {
            if (!User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            ICollection<PlayerViewModel> model = null;

            model = playerService.GetAllPlayers();

            return View(model);
        }

        public HttpResponse Collection()
        {
            if (!User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            ICollection<PlayerViewModel> model = null;

            model = playerService.GetMyPlayers(User.Id);

            return View(model);
        }

        public HttpResponse Add()
        {
            if (!User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            return View();
        }

        [HttpPost]
        public HttpResponse Add(AddPlayerInputModel model)
        {
            if (!User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }
            if (model.FullName.Length < 5 || model.FullName.Length > 80)
            {
                return Redirect("Add");
            }
            if (!Uri.IsWellFormedUriString(model.ImageUrl, UriKind.Absolute))
            {
                return Redirect("Add");
            }
            if (model.Position.Length < 5 || model.Position.Length > 20)
            {
                return Redirect("Add");
            }
            if (model.Speed < 0 || model.Speed > 10)
            {
                return Redirect("Add");
            }
            if (model.Endurance < 0 || model.Endurance > 10)
            {
                return Redirect("Add");
            }

            if (string.IsNullOrEmpty(model.Description) ||model.Description.Length > 200)
            {
                return Redirect("Add");
            }

            int playerId = playerService.AddPlayer(model.FullName, model.ImageUrl, model.Position, model.Speed, model.Endurance, model.Description);

            playerService.AddPlayerToCollection(User.Id, playerId);

            return Redirect("/");
        }

        public HttpResponse AddToCollection(int playerId)
        {
            if (!User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            playerService.AddPlayerToCollection(User.Id, playerId);
            return Redirect("/");
        }
        public HttpResponse RemoveFromCollection(int playerId)
        {
            if (!User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            playerService.RemovePlayerFromCollection(User.Id, playerId);
            return Redirect("/Players/Collection");
        }
    }
}
