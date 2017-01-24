
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using SignalRWeb.Infrastructure;


namespace ChatSample.Hubs
{
    // TODO: Make this work
    [Authorize]
    public class TwitterTrackHub : Hub
    {
        public static List<string> ConnectedClients = new List<string>();
        private readonly ITwitterStreamManager twitterStreamManager;

        private const string TWITTER_FEED_STARTED = "twitterFeedStarted";
        private const string TWITTER_FEED_STOPPED = "twitterFeedStopped";

        public TwitterTrackHub(ITwitterStreamManager twitterStreamManager)
        {
            this.twitterStreamManager = twitterStreamManager;
        }

        public override Task OnConnectedAsync()
        {
            ConnectedClients.Add(Context.ConnectionId);
            return Task.CompletedTask;
        }

        public override Task OnDisconnectedAsync(Exception ex)
        {
            ConnectedClients.Remove(Context.ConnectionId);
            if (!ConnectedClients.Any())
            {
                twitterStreamManager.StopStream();
            }
            return Task.CompletedTask;
        }

        public async Task StartStream(string stream)
        {
            twitterStreamManager.StartStream(stream);
            await Clients.All.InvokeAsync(TWITTER_FEED_STARTED, stream);
        }

        public async Task StopStream()
        {
            twitterStreamManager.StopStream();
            await Clients.All.InvokeAsync(TWITTER_FEED_STOPPED);
        }

    }
}
