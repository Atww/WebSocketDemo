import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import * as path from "path";

class HomeController implements IControllerBase {
    public path = '/'
    public router = express.Router()
    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get('/', this.index)
    }

    index = (req: Request, res: Response) => {

        // const users = [
        //     {
        //         id: 1,
        //         name: 'Ali'
        //     },
        //     {
        //         id: 2,
        //         name: 'Can'
        //     },
        //     {
        //         id: 3,
        //         name: 'Ahmet'
        //     }
        // ]

        // res.send(users)
        res.sendFile(path.resolve("./public/index.html"));
    }
}

export default HomeController