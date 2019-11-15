const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');
const Users = require('../auth/auth-model');

beforeAll(async () => {
    await db('users').truncate();
});

var token = ''

it ('should use testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('registration endpoint', function(){
    it('should accept new user and return id', async () => {
        const response = await request(server)
            .post('/api/auth/register')
            .send({ username: 'jest1', password: 'jesting123'});
        
        
        expect(response.status).toBe(201);
        expect(response.body[0]).toBe(1);
    })

    it('should validate username and password', async() => {
        const blank = await request(server)
            .post('/api/auth/register')
            .send({});

        const badUser = await request(server)
            .post('/api/auth/register')
            .send({ username: '2', password: 'jesting123'});

        const badPW = await request(server)
            .post('/api/auth/register')
            .send({ username: 'jest2', password: '123'});

        expect(blank.status).toBe(400);
        expect(badUser.status).toBe(400);
        expect(badPW.status).toBe(400);
    });
});

describe('login endpoint', function() {   
    it('should return a 401 if bad credentials', async() => {
        const response = await request(server)
            .post('/api/auth/login')
            .send({ username: 'jest1', password: 'qwerty' });
        expect(response.status).toBe(401);
    });

    it('should return an HTTP 200 c JWT token upon successful login', async() => {
        const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'jest1', password: 'jesting123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
    });

});

