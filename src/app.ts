import express from 'express'
import { Application, RequestHandler } from 'express'
import * as socketio from 'socket.io';
import cors from 'cors'
import http from 'http'
import LiveStream from './socket/Livestream'
class App {
    public app: Application
    public port: string
    private io;
    private http;
    constructor(appInit: { port: string; middleWares: any; controllers: any; }) {
        this.app = express();
        this.app.use(cors());
        this.port = appInit.port

        this.http = require("http").Server(this.app);
        this.io = require("socket.io")(this.http);
        LiveStream.initialise(this.io)
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.initSocketIO();
        // this.assets()
        // this.template()
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }): void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private assets(): void {
        this.app.use(express.static('public'))
        this.app.use(express.static('views'))
    }

    private template(): void {
        this.app.set('view engine', 'pug')
    }
    public GraphQL(route: string, GraphQLParams: RequestHandler): void {
        this.app.use(route, GraphQLParams)
    }
    public initSocketIO(): void {
        this.io.on("connection", function (socket: any) {
            console.log("a user connected");
            LiveStream.run(socket)
        });
    }

    public listen(): void {
        this.http.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App