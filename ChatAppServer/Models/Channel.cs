using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChatAppServer.Models
{
    public class Channel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public ICollection<Message>? Messages { get; set; }
    }
}
