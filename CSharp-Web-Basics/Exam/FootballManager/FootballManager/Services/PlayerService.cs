using FootballManager.Data;
using FootballManager.Data.Models;
using FootballManager.ViewModels.Players;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballManager.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly FootballManagerDbContext context;

        public PlayerService(FootballManagerDbContext context)
        {
            this.context = context;
        }

        public int AddPlayer(string fullName, string imageUrl, string position, byte speed, byte endurance, string description)
        {
            Player player = new Player
            {
                FullName = fullName,
                ImageUrl = imageUrl,
                Position = position,
                Speed = speed,
                Endurance = endurance,
                Description = description
            };

           
            context.Players.Add(player);
            
            context.SaveChanges();

            return player.Id;
        }

        public void AddPlayerToCollection(string ownerId, int playerId)
        {
            if (context.UserPlayers.Any(x => x.User.Id == ownerId && x.Player.Id == playerId))
            {
                return;
            }
            UserPlayer userPlayer = new UserPlayer()
            {
                PlayerId = playerId,
                UserId = ownerId
            };

            context.UserPlayers.Add(userPlayer);

            context.SaveChanges();
        }

        public ICollection<PlayerViewModel> GetAllPlayers()
        {
            var players = context.Players.Select(x => new PlayerViewModel
            {
                Id = x.Id,
                FullName = x.FullName,
                ImageUrl = x.ImageUrl,
                Position = x.Position,
                Speed = x.Speed,
                Endurance = x.Endurance,
                Description = x.Description,
            })
                .ToArray();

            return players;
        }

        public ICollection<PlayerViewModel> GetMyPlayers(string ownerId)
        {
            var players = context.UserPlayers.Where(x => x.UserId == ownerId).Select(x => new PlayerViewModel
            {
                Id = x.Player.Id,
                FullName = x.Player.FullName,
                ImageUrl = x.Player.ImageUrl,
                Position = x.Player.Position,
                Speed = x.Player.Speed,
                Endurance = x.Player.Endurance,
                Description = x.Player.Description,
            })
               .ToArray();

            return players;
        }

        public void RemovePlayerFromCollection(string ownerId, int playerId)
        {
            UserPlayer userPlayer = context.UserPlayers.FirstOrDefault(x => x.User.Id == ownerId && x.Player.Id == playerId);
            if (userPlayer == null)
            {
                return;
            }
            else
            {
                context.UserPlayers.Remove(userPlayer);
                context.SaveChanges();
            }
        }
    }
}
