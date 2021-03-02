import { Request, Response, NextFunction, RequestHandler } from 'express'

const loggerMiddleware: RequestHandler = (req: Request, resp: Response, next: NextFunction) => {

    console.log('Request logged:', req.method, req.path)
    next()
}

export default loggerMiddleware