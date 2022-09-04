const WebSocket = require("ws");
const EventEmitter = require("events");
const colors = [
    "FF0000",
    "FF7F00",
    "FFFF00",
    "00FF00",
    "00FFFF",
    "0000FF",
    "8B00FF",
    "FF00FF",
];

class Client extends EventEmitter {
    constructor(info = {}) {
        super();

        if (!info.id || !info.invite || !info.name) {
            throw new Error("Please enter all the required information");
        }

        this.id = info.id;
        this.invite = info.invite;
        this.name = info.name; 
        this.epilepsy = info.epilepsy;
    }

    destroyed = false;
    room = null;
    heart = false;
    ws = {};
    epilepsyint = false;

    
    connect() {
        if(this.destroyed) return;
        this.ws = new WebSocket(`wss://server${this.id>9?this.id:"0"+this.id}.gartic.io/socket.io/?EIO=3&transport=websocket`);

        this.ws.on("open", () => {
            if(this.destroyed) return this.ws.close();
            this.emit("connected");
            this.ws.send(`42[3,{"v":20000,"nick":"${this.name}","avatar":${Math.floor(Math.random()*36)},"sala":"${this.invite}"}]`);
        });
        this.ws.on("message", message => {
            if(this.destroyed) return this.ws.close();
            try {
                const data = JSON.parse(message.toString().slice(2));
                if (data[0] == 5){
                    this.room = data;
                    this.ws.send(`42[46,${this.room[2]}]`);
                    this.heart = setInterval(() => {
                        this.ws.send(`2`);
                        this.ws.send(`42[42,${this.room[2]}]`);
                    }, 25000);
                    this.emit("roomConnected", data);
                } else if(data[0] == 6){
                    this.emit("roomInvalid", data);
                }

                if(this.epilepsy){
                    if (data[0] == 16) {
                        this.ws.send(`42[34,${this.room[2]},0]`);
                        this.epilepsyint = setInterval(() => {this.paintall(colors[Math.floor(Math.random() * colors.length)]);}, 10)
                    } else if (data[0] == 18 && this.epilepsyint){
                        clearInterval(this.epilepsyint);
                    }
                }

            } catch (error) {

            }   
        });
        this.ws.on("close", data => {
            this.emit("disconnected", data);
            if (this.heart) clearInterval(this.heart);
            if (this.epilepsyint) clearInterval(this.epilepsyint);
        })
        return this;
    }
    paintall(color){
        if(this.destroyed) return;
        this.ws.send(`42[10,${this.room[2]},[5,"x${color}"]]`);
        this.ws.send(`42[10,${this.room[2]},[3,0,0,767,448]]`);
    }
    sendAnswer(msg) {
        if(this.destroyed) return;
        this.ws.send(`42[13,${this.room[2]},"${msg}"]`);
        return this;
    }
    sendChat(msg) {
        if(this.destroyed) return;
        this.ws.send(`42[11,${this.room[2]},"${msg}"]`);
        return this;
    }
    voteKick(id) {
        if(this.destroyed) return;
        this.ws.send(`42[45,${this.room[2]},[${typeof id == "string"? `"${id}"`:`${id}`},true]]`);
        return this;
    }
    disconnect() {
        try {
            this.ws.close();
        } catch (error) {
            
        }
        return this;
    }
    destroy() {
        this.destroyed = true;
        this.disconnect();
        return true;
    }
    
}

module.exports = Client;
