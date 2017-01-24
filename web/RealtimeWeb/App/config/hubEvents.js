const hubEvents = {
    NOTIFY_TWEET : "notifyTweet",
    TWITTER_FEED_STARTED: "twitterFeedStarted",
    TWITTER_FEED_STOPPED: "twitterFeedStopped",
    BROADCAST_MESSAGE : "broadcastMessage",
    HUB_STARTED: "hubstarted"
};

const hubActions =  {
    START_STREAM : "StartStream",
    STOP_STREAM : "StopStream"
}

export { hubEvents, hubActions };