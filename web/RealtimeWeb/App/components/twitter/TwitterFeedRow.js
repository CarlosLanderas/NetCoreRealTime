import React from "react";

const TwitterFeedRow = ({tweet}) => {
    let { profileImage, user, text, created } = tweet;
    return (
            <div>       
               <ul id="tweetsTimeLine" className="timeline" >
                <li>
                    <div> <span>{user}</span></div>
                    <div className="avatar">                      
                        <img src={profileImage} />
                    </div>
                    <div className="bubble-container">
                        <div className="bubble"> {text} </div>
                        <div className="arrow"></div>
                    </div>
                </li>
             </ul>
          </div>
    )
}

export { TwitterFeedRow };
