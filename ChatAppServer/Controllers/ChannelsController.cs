using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatAppServer.Data;
using ChatAppServer.Models;

[Route("api/[controller]")]
[ApiController]
public class ChannelsController : ControllerBase
{
    private readonly ChatAppDbContext _context;

    public ChannelsController(ChatAppDbContext context)
    {
        _context = context;
    }

    // GET: api/Channels
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Channel>>> GetChannels()
    {
        return await _context.Channels.ToListAsync();
    }

    // GET: api/Channels/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Channel>> GetChannel(int id)
    {
        var channel = await _context.Channels.FindAsync(id);

        if (channel == null)
        {
            return NotFound();
        }

        return channel;
    }

    // PUT: api/Channels/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateChannel(int id, Channel channel)
    {
        if (id != channel.Id)
        {
            return BadRequest();
        }

        _context.Entry(channel).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ChannelExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Channels
    [HttpPost]
    public async Task<ActionResult<Channel>> CreateChannel(Channel channel)
    {
        _context.Channels.Add(channel);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetChannel", new { id = channel.Id }, channel);
    }

    // DELETE: api/Channels/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteChannel(int id)
    {
        var channel = await _context.Channels.FindAsync(id);
        if (channel == null)
        {
            return NotFound();
        }

        _context.Channels.Remove(channel);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ChannelExists(int id)
    {
        return _context.Channels.Any(e => e.Id == id);
    }
}
