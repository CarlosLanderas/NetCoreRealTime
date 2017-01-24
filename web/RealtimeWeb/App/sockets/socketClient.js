import EventEmitter from 'events';

const ON_RECEIVED_MESSAGE = "OnReceivedMessage";
let eventEmitter = null;

export class SocketClient {
    constructor(socketName){
        this.socketName = socketName;       
        eventEmitter = new EventEmitter();
    }

    connect() {
        var socket = new WebSocket(`ws://${document.location.host}/${this.socketName}/ws`)
        socket.onmessage = this.onMessage;        
        socket.onclose = this.onClose;
        socket.onopen = this.onOpen;
        this.socket= socket;
    }

    sendMessage(message) {
        this.socket.send(message);
    }

    close() {
        this.socket.close();     
        eventEmitter = null;
    }

    onOpen() {
        console.log('connection opened');
    }

    onClose() {
        console.log('connection closed');
    }

    onMessage(message) {
        eventEmitter.emit(ON_RECEIVED_MESSAGE, message.data);
    }

    subscribeReceivedMessages(callback) {
        eventEmitter.on(ON_RECEIVED_MESSAGE, callback);
    }

}