import request from 'supertest';
import { app, Shutdown } from '../../src/server';

describe('Our app', () => {
    afterAll((done) => {
        Shutdown(done);
    });

    it('Starts and has the proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(app).toBeDefined();
    }, 10000);

    it('Returns all options allowed to be called', async () => {
        const response = await request(app).options('/');

        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
    }, 10000);

    it('main healthcheck ok?', async () => {
        const response = await request(app).get('/main/healthcheck');

        expect(response.status).toBe(200);
    }, 10000);
});
