import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()
class ProjectController implements IControllerBase {
    public path = '/project'
    public router = express.Router()
    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.get(this.path, this.index)
    }

    index = async (req: Request, res: Response) => {
        const result = await prisma.$queryRaw(`Select XVEmpCode FROM TUsrMEmployee`)
        res.send(result)
    }
}

export default ProjectController