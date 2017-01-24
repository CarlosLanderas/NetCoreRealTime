using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Http;
using Microsoft.AspNetCore.SignalR;
using ChatSample.Hubs;


namespace SignalRWeb.Controllers
{
    [Route("api/[controller]")]
    public class RealtimeController : Controller
    {
        private readonly IHubContext<TwitterTrackHub> twitterTrackerHub;
        private const string BROADCAST_MESSAGE = "broadcastMessage";

        public RealtimeController(IHubContext<TwitterTrackHub> twitterTrackerHub)
        {
            this.twitterTrackerHub = twitterTrackerHub;
        }
     
        [HttpPost, Route("[action]")]
        public async Task<IActionResult> Send([FromBody]BroadcastRequest broadcast)
        {            
            await twitterTrackerHub.Clients.All.InvokeAsync(BROADCAST_MESSAGE, broadcast.Message);
            return Ok();
        }
    }
}
