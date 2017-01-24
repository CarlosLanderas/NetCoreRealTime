import EventEmitter from 'events';
import hubsConfig from '../config/hubsConfig';
import { hubEvents, hubActions } from '../config/hubEvents';

const TWITTER_HUB = "twittertrack";

export class TwitterHub {
    
    constructor(){
        this.eventEmitter = new EventEmitter();
        console.log(`Connecting to hub ${TWITTER_HUB}`);
        this.connection =  new signalR.HubConnection(`http://${document.location.host}/${TWITTER_HUB}`, hubsConfig.jsonFormat);
        this.subscribeEvents(this.connection);        
    }

    subscribeEvents(connection) {
        
        connection.on(hubEvents.NOTIFY_TWEET, (tweet) => {
            this.publish(hubEvents.NOTIFY_TWEET, tweet);
        });
        connection.on(hubEvents.TWITTER_FEED_STARTED, (feed) => {
            this.publish(hubEvents.TWITTER_FEED_STARTED, feed);
        });

        connection.on(hubEvents.TWITTER_FEED_STOPPED, () => {
            this.publish(hubEvents.TWITTER_FEED_STOPPED);
        });

        connection.on(hubEvents.BROADCAST_MESSAGE, (message)=> {
            this.publish(hubEvents.BROADCAST_MESSAGE, message);
        });
    }

    start() {
        this.connection.start().then( ()=> this.publish(hubEvents.HUB_STARTED));        
    }

    stop() {
        this.connection.stop();
    }

    startFeed(feed){
        this.connection.invoke(hubActions.START_STREAM, feed);
    }

    stopFeed() {
        this.connection.invoke(hubActions.STOP_STREAM);
    }
    
    subscribe(eventName, callback) {
        this.eventEmitter.on(eventName, callback);
    }

    publish(eventName, data) {
        this.eventEmitter.emit(eventName, data);
    }


}