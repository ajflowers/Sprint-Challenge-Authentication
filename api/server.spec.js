const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

it ('should use testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

