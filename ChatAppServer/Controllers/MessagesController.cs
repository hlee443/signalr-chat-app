using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatAppServer.Data;
using ChatAppServer.Models;

[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    private readonly ChatAppDbContext _context;

    public MessagesController(ChatAppDbContext context)
    {
        _context = context;
    }

    // GET: api/Messages?channelId=1
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessages([FromQuery] int channelId)
    {
        return await _context.Messages.Where(m => m.ChannelId == channelId).ToListAsync();
    }

    // GET: api/Messages/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Message>> GetMessage(int id)
    {
        var message = await _context.Messages.FindAsync(id);

        if (message == null)
        {
            return NotFound();
        }

        return message;
    }

    // POST: api/Messages
    [HttpPost]
    public async Task<ActionResult<Message>> CreateMessage(Message message)
    {
        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetMessage", new { id = message.Id }, message);
    }

    // Other actions like UpdateMessage and DeleteMessage can be added here if needed.

    // PUT: api/Messages/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMessage(int id, Message message)
    {
        if (id != message.Id)
        {
            return BadRequest();
        }

        _context.Entry(message).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Messages/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var message = await _context.Messages.FindAsync(id);
        if (message == null)
        {
            return NotFound();
        }

        _context.Messages.Remove(message);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MessageExists(int id)
    {
        return _context.Messages.Any(e => e.Id == id);
    }
}
