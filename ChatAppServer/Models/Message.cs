using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatAppServer.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Content { get; set; }

        [Required]
        public string? Username { get; set; }

        [ForeignKey("Channel")]
        public int ChannelId { get; set; }

        public Channel? Channel { get; set; }
    }
}
