using ChatSample.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using Tweetinvi;
using Tweetinvi.Models;
using Tweetinvi.Streaming;

namespace SignalRWeb.Infrastructure
{
    public class TwitterStreamManager: ITwitterStreamManager
    {
        private readonly IHubContext<TwitterTrackHub> twitterTrackHub;
        private IFilteredStream stream;
        
        public TwitterStreamManager(IHubContext<TwitterTrackHub> twitterTrackHub, IOptions<TwitterConfig> twitterConfig)
        {
            this.twitterTrackHub = twitterTrackHub;
            AuthenticateUser(twitterConfig.Value);
        }     

        public void StartStream(string track)
        {
            stream = Stream.CreateFilteredStream();
            stream.AddTrack(track);
            stream.MatchingTweetReceived += (sender, tweetArgs) =>
            {
                var tweet = tweetArgs.Tweet;              

                twitterTrackHub.Clients.All.InvokeAsync("notifyTweet", new {
                    id = tweet.Id,
                    created = tweet.CreatedAt.TimeOfDay.ToString(),
                    text = tweet.FullText,
                    user = tweet.CreatedBy.Name,
                    profileImage = tweet.CreatedBy.ProfileImageUrl
                });
            };

            stream.StartStreamMatchingAllConditionsAsync();            
        }
    
        public void StopStream()
        {
            if (stream.StreamState == StreamState.Stop)
            {
                return;
            }            
            stream.StopStream();
            stream.ClearTracks();            
        }

        private void AuthenticateUser(TwitterConfig twitterConfig)
        {
            Auth.SetUserCredentials(twitterConfig.ConsumerKey,
                                   twitterConfig.ConsumerSecret,
                                   twitterConfig.UserAccessToken,
                                   twitterConfig.UserAccessSecret);
        }
    }
}
