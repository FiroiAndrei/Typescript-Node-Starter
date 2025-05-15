import http from 'http';
import express from 'express';
import './config/logging';

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
};
