import * as socketio from 'socket.io';

let io: socketio.Socket;

var RoomList: Room[] = [];
type Room = {
    id: string,
    name: string
}
const initialise = (io: socketio.Server) => {
    io = io;
}

const run = (socket: socketio.Socket) => {
    socket.on("message", function (message: any) {
        console.log(message);
    });

}
// export these functions for external use
module.exports = { initialise, run };