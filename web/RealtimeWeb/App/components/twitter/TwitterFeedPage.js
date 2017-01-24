import React from "react";
import { TwitterHub } from '../../hubs/twitterHub';
import {TwitterFeedRow } from './TwitterFeedRow';
import { TwitterFeedControl } from './TwitterFeedControl';
import { hubEvents } from '../../config/hubEvents';

import toastr from 'toastr';

toastr.options = {   
    "positionClass": "toast-bottom-right"
}

export class TwitterFeedPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tweets: []
        };

        this.twitterHub = new TwitterHub();        
        this.onFeedStarted = this.onFeedStarted.bind(this);
        this.onFeedStopped = this.onFeedStopped.bind(this);
    }

    componentWillMount(){
        this.twitterHub.subscribe(hubEvents.NOTIFY_TWEET, (newTweet) => {
            let newTweetList = [newTweet, ...this.state.tweets].slice(0,50);
            this.setState( {
                tweets: newTweetList
            });
        });    
        
        this.twitterHub.subscribe(hubEvents.TWITTER_FEED_STARTED, (feed) => {
          
            this.clearFeed();
            toastr.success(`Starting new feed with tag : ${feed}`);
        });
             
        this.twitterHub.subscribe(hubEvents.TWITTER_FEED_STOPPED, () => {
            this.clearFeed();
            toastr.info('The feed has been stopped');
        });

        this.twitterHub.subscribe(hubEvents.HUB_STARTED, () => {
            toastr.success('Hub connection started!');
        });
        this.twitterHub.subscribe(hubEvents.BROADCAST_MESSAGE, (message) => {
            toastr.success(message);
        });

        this.twitterHub.start();
    }

    clearFeed() {
        this.setState( {
            tweets: []
        });
    }

    componentWillUnmount(){
        this.twitterHub.stop();
    }

    onFeedStarted(feed) {
        this.twitterHub.startFeed(feed);
    }

    onFeedStopped() {
        this.twitterHub.stopFeed();
    }

    render() {
        return (
            <div>
                <TwitterFeedControl startFeed={this.onFeedStarted} stopFeed={this.onFeedStopped} />                
                <div> {              
                    this.state.tweets.map( tweet => {
                        return <TwitterFeedRow tweet={tweet} key={Math.random()} />
                    })              
                }
                </div>
            </div>
        )
    }

}

