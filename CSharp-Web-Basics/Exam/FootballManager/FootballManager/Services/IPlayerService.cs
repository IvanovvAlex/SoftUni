using FootballManager.ViewModels.Players;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballManager.Services
{
    public interface IPlayerService
    {
        int AddPlayer(string fullName, string imageUrl, string position, byte speed, byte endurance, string description);

        ICollection<PlayerViewModel> GetAllPlayers();
        ICollection<PlayerViewModel> GetMyPlayers(string ownerId);
        void AddPlayerToCollection(string ownerId, int playerId);
        void RemovePlayerFromCollection(string ownerId, int playerId);
    }
}
