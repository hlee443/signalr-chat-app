using Microsoft.AspNetCore.SignalR;

namespace ChatAppServer.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(int channelId, string username, string content)
        {
            await Clients.All.SendAsync("ReceiveMessage", channelId, username, content);
        }

        public async Task EditMessage(int channelId, int messageId, string content)
        {
            await Clients.All.SendAsync("ReceiveMessageEdit", channelId, messageId, content);
        }

        public async Task DeleteMessage(int channelId, int messageId)
        {
            await Clients.All.SendAsync("ReceiveMessageDelete", channelId, messageId);
        }

        public async Task AddChannel(int channelId, string channelName)
        {
            await Clients.All.SendAsync("ReceiveChannelAdd", channelId, channelName);
        }

        public async Task EditChannel(int channelId, string channelName)
        {
            await Clients.All.SendAsync("ReceiveChannelEdit", channelId, channelName);
        }

        public async Task DeleteChannel(int channelId)
        {
            await Clients.All.SendAsync("ReceiveChannelDelete", channelId);
        }

        public async Task JoinChannel(int channelId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, channelId.ToString());
        }

        public async Task LeaveChannel(int channelId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelId.ToString());
        }
    }
}
