using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballManager.Data.Models
{
    public class UserPlayer
    {
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public int PlayerId { get; set; }

        public virtual Player Player { get; set; }
    }
}
