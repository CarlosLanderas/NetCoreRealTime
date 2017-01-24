import React from 'react';
import { SocketClient } from '../../sockets/socketClient';
import userMessageImage from '../images/usermessage.png';

export class ChatPage extends React.Component {
    constructor(props, context) {
        super(props, context);
                
        this.state = {
            messages: [],
            message: ''
        }      
        this.sendMessage = this.sendMessage.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
    }
    componentWillMount() {
        this.socket = new SocketClient('chatendpoint');
        this.socket.subscribeReceivedMessages(this.onMessageReceived.bind(this));
        this.socket.connect();
    } 

    onChangeMessage(event) {
        this.setState({
            message : event.target.value
        });
    }

    onMessageReceived(message) {
        let messages = this.state.messages;
        this.setState({
            messages: [...this.state.messages, {message, time: this.appendTime()}]
        });
    }

    sendMessage(message){
        this.socket.sendMessage(this.state.message);
    }
    
    appendTime() {
        var date = new Date(); 
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;            
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {

       
        return(
         <div>
            <div className="bottom-buffer-15">
                <label htmlFor="message" value="message"/>
                <input type="text"  onChange={this.onChangeMessage} value={this.state.message} />
                <input type="button" className="btn btn-info btn-sm" value="Send message" onClick={this.sendMessage}/>
            </div>
             <div> {            
                 this.state.messages.map( message => {
                     return (
                        <ul key={Math.random()} id="tweetsTimeLine" className="timeline" >
                            <li>     
                                <div className="avatar">                      
                                    <img src={userMessageImage} />
                                </div>
                                <div className="bubble-container">
                                    <div className="bubble"> {message.time} {message.message} </div>
                                    <div className="arrow"></div>
                                </div>
                            </li>
                        </ul>
                  )
                 })
             }
            </div>
        </div>
        )
    }
}