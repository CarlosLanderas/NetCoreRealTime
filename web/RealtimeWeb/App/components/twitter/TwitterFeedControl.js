import React from "react";


export class TwitterFeedControl extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            feed: '',
            startFeed: props.startFeed,
            stopFeed : props.stopFeed
        }

        this.updateFeed = this.updateFeed.bind(this);
        this.startFeed = this.startFeed.bind(this);
        this.stopFeed = this.stopFeed.bind(this);
    }

    updateFeed(event) {
        this.setState({
            feed: event.target.value
        });
    }

    startFeed(){
        this.state.startFeed(this.state.feed);
    }

    stopFeed(){
        this.state.stopFeed();
    }

    render() {
        return(
        <div className="row">
            <div className="col-md-12">  
                    <input type="text" value={this.state.feed} onChange={this.updateFeed}/>
                    <input type="button" className=" btn  btn-info btn-sm" value="Start feed" onClick={this.startFeed}/>
                    <input className="btn btn-critical btn-sm" type="button" value="Stop feed" onClick={this.stopFeed}/>                    
            </div>
        </div>    
        )
    }
}
