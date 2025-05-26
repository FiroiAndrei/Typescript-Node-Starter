import http from 'http';
import express from 'express';
import './config/logging';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER } from './config/config';

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('-------------------------------------------');
    logging.info('Initialising API');
    logging.info('-------------------------------------------');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    logging.info('-------------------------------------------');
    logging.info('Logging & Configuration');
    logging.info('-------------------------------------------');

    app.use(loggingHandler);
    app.use(corsHandler);

    logging.info('-------------------------------------------');
    logging.info('Define controllers');
    logging.info('-------------------------------------------');

    app.get('/main/healthcheck', (req, res, next) => {
        res.status(200).json({ hello: 'World!' });
        return;
    });

    logging.info('-------------------------------------------');
    logging.info('Define Not Found Method');
    logging.info('-------------------------------------------');

    app.use(routeNotFound);

    logging.info('-------------------------------------------');
    logging.info('Start Server');
    logging.info('-------------------------------------------');

    httpServer = http.createServer(app);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('-------------------------------------------');
        logging.info('Server started at ' + SERVER.server_HOSTNAME + ':' + SERVER.SERVER_PORT);
        logging.info('-------------------------------------------');
    });
};

export const Shutdown = (callback: any) => {
    httpServer && httpServer.close(callback);
};

Main();
