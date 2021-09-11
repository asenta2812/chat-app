// config environment variables
import environment from 'dotenv';
import express from 'express';
import { join } from 'path';
import connectDatabase from './config/db';
import configHandleBars from './config/handler-bars';
import configMiddleware from './config/middleware';
import formatResponse from './config/middleware/format-response';
import handleError from './config/middleware/handle-error';
import initSocketIO from './config/socket.io';
import configRouter from './routes/index';
environment.config({
    path: join(__dirname, '..', `.env.${process.env.NODE_ENV}`),
});

const app = express();
const port = process.env.PORT || 3000;

// http server
const http = require('http');
const server = http.createServer(app);

// config socket io
initSocketIO(server, app);

//connect to db
connectDatabase();

// config HandleBars
configHandleBars(app);

//use middleware
configMiddleware(app, express);

//config router
configRouter(app);

// app use handle errors
app.use(handleError);

app.use(formatResponse);

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
