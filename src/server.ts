import App from './app';
import * as bodyParser from 'body-parser'
import { schema } from './prisma/schema'
import { context } from './prisma/context'
import { graphqlHTTP } from 'express-graphql'
import HomeController from './controller/home.controller';
import config from './config';
import loggerMiddleware from './middleware/logger';
import ProjectController from './controller/project.controller';

const app = new App({
    port: config.port,
    controllers: [
        new HomeController(),
        new ProjectController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})
if (config.env == "development") {
    app.GraphQL(
        '/devgraphql',
        graphqlHTTP({
            schema: schema,
            context: context,
            graphiql: true,
        }),
    )
}

app.GraphQL(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        context: context,
        graphiql: false,
    }),
)

app.listen()